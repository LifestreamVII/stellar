import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react'
import {
    FaCloudUploadAlt,
  } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useWebSocket from '~/scripts/useWebSocket';

const Upload = () => {

  const [uploadData, setUploadData] = useState(null);
  const [songData, setSongData] = useState({album: "", title: "", artist: ""})
  
  const { socket, status:statusSocket, uid:socketUID } = useWebSocket();
  
  const notify = useRef(null);
  
  useEffect(() => {
    if (statusSocket) {
      console.log(statusSocket);
      if (notify.current) {
        toast.update(notify.current, {render: statusSocket.status, progress: statusSocket.current == 100 ? undefined : statusSocket.current / 100, autoClose: 3000});
      } else {
        notify.current = toast(statusSocket.status, {progress: 0, autoClose: false, theme: 'dark'});
      }
    }
  }, [statusSocket])
  

  const handleUploadChange = (event) => {
    switch (event.target.name) {
      case "artist":
        songData.artist = event.target.value;
        break;
        case "album":
        songData.album = event.target.value;
        break;
        case "title":
        songData.title = event.target.value;
        break;
    }
  }

  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('usage', 'song');
    try {
      const response = await fetch('/upload', { // update this to your uploading endpoint
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }
      const image = result.tags.image.imageBuffer.data;
      var binary = '';
      var bytes = new Uint8Array( image );
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
          binary += String.fromCharCode( bytes[ i ] );
      }
      result.img = window.btoa(binary);
      setUploadData(result);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];  // assuming single file selection
    if (file) {
      handleFileUpload(file);
      socket.connect();
      const formData = new FormData();
      formData.append('userid', socketUID);
      console.log(socketUID);
      formData.append('audio', file);
      axios.post('http://localhost:5000/process-audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {

      })
    }
  };

  return (
    <div>
    <ToastContainer />
    {
      !uploadData ? (
        <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{'display': 'none'}}
            />
            <div className="upload-container" onClick={onButtonClick}>
                <div className="upload-icon">
                    <FaCloudUploadAlt/>
                </div>
                <p className="upload-text">Click to upload a track or Drag and Drop</p>
            </div>
        </div>
      ) : (
        <div>
            <div className="upload-container">
                <div className='cover'>
                  <img src={"data:image/png;base64, "+ uploadData.img} alt="" srcset="" />
                </div>
                <div className='info'>
                  <div>
                    <label className="mb-es" htmlFor='artist'>Artist</label>
                    <input name='artist' placeholder={uploadData.tags.artist} onChange={handleUploadChange}/>
                  </div>
                  <div>
                    <label className="mb-es" htmlFor='album'>Album</label>
                    <input name='album' placeholder={uploadData.tags.album} onChange={handleUploadChange}/>
                  </div>
                  <div>
                    <label className="mb-es" htmlFor='title'>Title</label>
                    <input name='title' placeholder={uploadData.tags.title} onChange={handleUploadChange}/>
                  </div>
                </div>
            </div>
        </div>
      )
    }
    </div>
  )
}

export default Upload