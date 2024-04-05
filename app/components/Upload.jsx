import React, { useRef, useState } from 'react'
import {
    FaCloudUploadAlt,
  } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useWebSocket from 'react-use-websocket';

const Upload = () => {

  const socket = new WebSocket("ws://localhost:5000");
  const [uploadData, setUploadData] = useState(null);
  const [songData, setSongData] = useState({album: "", title: "", artist: ""})
  const [uploadStatus, setStatus] = useState("");
  const notify = () => toast(uploadStatus);
  
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
      console.log(result.img)
      setUploadData(result);  
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];  // assuming single file selection
    if (file) {
      handleFileUpload(file);
      const formData = new FormData();
      formData.append('file', file);
      socket.addEventListener("connect", (event) => {
        console.log("Connected to server");
      });
      axios.post('upload_file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        useWebSocket(WS_URL, {
          connect: () => {
            console.log('WebSocket connection established.');
          }
        });
      })
    }
  };

  return (
    <div>
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