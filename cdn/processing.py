import os
import uuid
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
from flask_socketio import (
    SocketIO,
    emit,
    disconnect
)
from requests import post


app = Flask(__name__)
app.debug = True
path = os.path.dirname(os.path.realpath(__file__))
app.clients = {}
CORS(app, resources={r"*": {"origins": "*"}}, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
celery = Celery(app.name, broker='redis://localhost:6379/0')
r = redis.Redis(host='localhost', port=6379, db=0)

# SocketIO
socketio = SocketIO(app, cors_allowed_origins='*', message_queue='redis://localhost:6379/0')

@celery.task(bind=True)
def process_audio_file(self, file_path, userid, url):
    '''
        Process the audio file here.

        Generate the M3U8 variants for different bitrates (128kbps, 256kbps, 320kbps)
    '''
    print('begin task')
    try:
        line = ""
        meta = {}
        perc = 0
        proc = subprocess.Popen(args=['sh', f"{path}/fileToHLS.sh"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, universal_newlines=True)
        while True:
            line = str(proc.stdout.read(100))
            if not line or perc == 100:
                break
            perc = extract_percentage(line)
            meta = {'current': perc, 'total': 100, 'status': f'Processing HLS : {perc} %', 'userid': userid}
            post(url, json=meta)
        proc = None
        perc = 100
        meta["status"] = 'Finished processing'
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
    print(userid)
    print(data)
    ns = app.clients.get(userid)
    if ns and data:
        socketio.emit(event='celerystatus', data=data, namespace=ns, to=userid)
        return 'ok'
    return 'error', 404


@app.route('/download', methods=['POST'])
def download_file():
    if None :
        url = request.json['url']
        response = requests.get(url)
        file_id = str(uuid.uuid4())
        file_path = os.path.join('/tmp', file_id + '.mp3')
        with open(file_path, 'wb') as f:
            f.write(response.content)
        r.set(file_id, file_path)
        return jsonify({'id': file_id})

@app.route('/process-audio', methods=['POST'])
def process_audio():
    file = request.files['audio']
    userid = request.form.get('userid')
    file_path = f'/tmp/2020/original/file.mp3'
    file.save(file_path)
    task = process_audio_file.delay(file_path, userid, url_for('event', _external=True))
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
    userid = request.sid
    session['userid'] = userid
    current_app.clients[userid] = request.namespace
    print('Client %s connected' % userid)
    emit('userid', {'userid': userid})
    emit('status', {'status': 'Connected user', 'userid': userid})


@socketio.on('disconnect', namespace='/events')
def events_disconnect():
    del current_app.clients[session['userid']]
    print('Client %s disconnected' % session['userid'])


if __name__ == '__main__':
    socketio.run(app, debug=True)