import os
import uuid
import json
import subprocess
import redis
from flask import Flask, request, jsonify
import random
from flask_cors import CORS, cross_origin
import time
import uuid
from flask import (
    Flask,
    request,
    render_template,
    session,
    redirect,
    url_for,
    jsonify,
    current_app
)
import re
from celery import Celery
from celery.result import AsyncResult
from flask_socketio import (
    SocketIO,
    emit,
    disconnect
)
from requests import post
from collections import defaultdict
import firebase_admin
from firebase_admin import firestore
import io
import soundfile as sf
import numpy as np

cred_obj = firebase_admin.credentials.Certificate('./serviceAccountKey.json')

default_app = firebase_admin.initialize_app(cred_obj, {
'databaseURL':'stellar-imagine.firebaseapp.com'
})
db = firestore.client()
ref = db.collection("songs")

app = Flask(__name__)
app.debug = True
path = os.path.dirname(os.path.realpath(__file__))
app.clients = {}
CORS(app, resources={r"*": {"origins": "*"}}, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'
celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'], backend=app.config['CELERY_RESULT_BACKEND'])
celery.conf.update(app.config)
r = redis.Redis(host='localhost', port=6379, db=0)

# SocketIO
socketio = SocketIO(app, cors_allowed_origins='*', message_queue='redis://localhost:6379/0')

# --------------------------------------

# Implement JWT Authentication here to protect routes

# --------------------------------------

class TaskManager:
    def __init__(self):
        self.tasks = defaultdict(dict)
        
    def get_tasks(self, user_id):
        cached = r.get('tasks')
        if cached :
            print(json.loads(r.get('tasks')))
            cached = json.loads(r.get('tasks'))
            if user_id in cached:
                return cached[user_id]
            else:
                cached[user_id] = []
        else :
            cached = {user_id: []}
        r.set('tasks', json.dumps(cached))
        return []

    def update_status(self, user_id, task_id, status):
        self.tasks[user_id][task_id]['status'] = status
        self.write_to_redis(user_id, task_id)

    def write_to_redis(self, user_id, task_id):
        cached = r.get('tasks')
        my_tasks = []
        if cached:
            cached = json.loads(r.get('tasks'))
            print(self.get_tasks(user_id))
            my_tasks = self.get_tasks(user_id)
            if my_tasks and type(my_tasks) is list:
                if task_id not in my_tasks:
                    my_tasks.append(task_id)
            else:
                my_tasks = [task_id]
            my_tasks = list(set(my_tasks))  # Remove duplicates
        else:
            cached = defaultdict(dict)
        cached[user_id] = my_tasks
        r.set('tasks', json.dumps(cached))

# Instantiate TaskManager
task_manager = TaskManager()

def get_audio_duration(file):
    f = open(file, 'rb')
    content = f.read()
    audio_io = io.BytesIO(content)
    data, samplerate = sf.read(audio_io)
    return len(data) / samplerate

@celery.task(bind=True) 
def process_audio_file(self, file_path, userid, url, song):
    '''
        Process the audio file here.

        Generate the M3U8 variants for different bitrates (128kbps, 256kbps, 320kbps)
    '''
    print('begin task')
    try:
        line = ""
        meta = {
            'current': 0, 
            'total': 100, 
            'status': 'Initializing',
            'userid': userid,
            'song': song
            }
        task_id = self.request.id
        task_manager.tasks[userid][task_id] = {'id': task_id, 'status': meta}
        task_manager.write_to_redis(userid, task_id)
        duration = get_audio_duration(file_path)
        post(url, json=meta)
        songref = ref.add(
            {
                'artists': [{'id': userid}],
                'genre': [song["genre"]],
                'visibility': song["visibility"], 
                'coverUrl': song["img_url"],
                'originalUrl': song["fb_id"],
                'title': song["title"],
                'duration': duration,
                'isPlayable': 2,
                'endpoint': song["endpoint"],
                'createdAt': time.time(),
            }
        )
        proc = subprocess.Popen(args=['sh', f"{path}/fileToHLS.sh", file_path], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, universal_newlines=True)
        # task_manager.update_status(userid, task_id, meta)
        perc = 0
        while True:
            line = str(proc.stdout.read(100))
            if not line or perc == 100:
                break
            perc = extract_percentage(line)
            meta['current'] = perc-1 if perc > 0 else 0
            meta['status'] = f'Processing HLS : {perc} %'
            self.update_state(state='PROGRESS', meta=meta)
            post(url, json=meta)
        proc = None
        perc = 99
        meta['current'] = perc
        meta['status'] = 'Updating Database...'
        task_manager.update_status(userid, task_id, meta)
        post(url, json=meta)
        output_path = f"{os.path.dirname(file_path)}/output"
        songref_id = songref[1].id
        songref = ref.document(songref_id)
        songref.set(
            {
                "path": 
                    {"master": f"{output_path}/master.m3u8",
                     "128": f"{output_path}/0.m3u8",
                     "256": f"{output_path}/1.m3u8",
                     "320": f"{output_path}/2.m3u8"
                    },
                "isPlayable": 1
        }, merge=True)
        perc = 100
        meta['current'] = perc
        meta['status'] = 'Done.'
        task_manager.update_status(userid, task_id, meta)
        post(url, json=meta)
        return meta
    except Exception as e:
        meta = {'current': 100, 'total': 100, 'status': str(e),
        'userid': userid}
        post(url, json=meta)
        return meta


def extract_percentage(string):
    # Regular expression pattern to find percentage values
    pattern = r'(\d{1,3})%'

    # Search for the pattern in the string
    match = re.search(pattern, string)

    if match:
        # Extract the percentage value and convert it to an integer
        percentage = int(match.group(1))
        return percentage
    else:
        # If no percentage is found, return None or raise an error, based on your requirement
        return None


@app.route('/event/', methods=['POST'])
def event():
    userid = request.json['userid']
    data = request.json
    sid = r.get(userid).decode('utf-8')
    print ('SID : ' + sid)
    ns = app.clients.get(userid)
    if ns and data and sid:
        socketio.emit(event='celerystatus', data=data, namespace=ns, to=sid)
        return 'ok'
    return 'error', 404


@app.route('/download', methods=['GET'])
def download_file():
    task_ids = task_manager.get_tasks(request.args.get('userid'))
    results = {}
    for task_id in task_ids:
        result = celery.AsyncResult(task_id)
        results[task_id] = result._get_task_meta()
    return jsonify(results)

@app.route('/process-audio', methods=['POST'])
def process_audio():
    file = request.files['audio']
    track_name = request.form.get('title')
    fb_id = request.form.get('fb_id')
    img_url = request.form.get('img_url')
    userid = request.form.get('userid')
    endpoint = request.form.get('endpoint')
    genre = request.form.get('genre')
    visibility = request.form.get('visibility')
    upath = f'/tmp/{userid}/{endpoint}/original/'
    isExist = os.path.exists(upath)
    if not isExist:
        os.makedirs(upath)
    file_path = upath+file.filename
    file.save(file_path)
    task = process_audio_file.apply_async(args=[file_path, userid, url_for('event', _external=True), {'title': track_name, 'fb_id': fb_id, 'img_url': img_url, 'endpoint': endpoint, 'genre': genre, 'visibility': visibility}])
    return jsonify(f"Audio processing task started with task ID: {task.id}")

@socketio.on('status', namespace='/events')
def events_message(message):
    emit('status', {'status': message['status']})

@socketio.on('disconnect request', namespace='/events')
def disconnect_request():
    emit('status', {'status': 'Disconnected!'})
    disconnect()

@app.route('/clients', methods=['GET'])
def clients():
    return jsonify({'clients': app.clients.keys()})

@socketio.on('connect', namespace='/events')
def events_connect():
    
    # Grab the unique Session ID
    sessionid = request.sid

    # Initialize the User ID
    userid = ""
    
    # Check if the User ID is passed from client
    if (request.args.get('userid')) :
        userid = request.args.get('userid')
    else:
        userid = str(uuid.uuid4())

    # Assign the Session ID to the User ID in Redis
    r.set(userid, sessionid)

    print ('SID : ' + sessionid)

    session["userid"] = userid
    current_app.clients[userid] = request.namespace
    print('Client %s connected' % userid)
    emit('session', {'userid': userid, 'sessionid': sessionid})
    emit('status', {'status': 'Connected user', 'userid': userid})


@socketio.on('disconnect', namespace='/events')
def events_disconnect():
    del current_app.clients[session['userid']]
    r.delete(session['userid'])
    print('Client %s disconnected' % session['userid'])


if __name__ == '__main__':
    socketio.run(app, debug=True)