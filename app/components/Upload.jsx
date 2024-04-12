import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react'
import {
    FaCloudUploadAlt,
  } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUpload from '~/scripts/useUpload';
import useWebSocket from '~/scripts/useWebSocket';

const Upload = () => {

  const [songData, setSongData] = useState({album: "", title: "", artist: ""})
  const [songFile, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const {uploadFile, tags:uploadData, progress, downloadURL, image} = useUpload();

  const { socket } = useWebSocket("3SWiGIUR4zdEvmzQzTEjcdotZ7z1", "toast");

  const formatTitle = (title) => {
    return title.replace(/\s+/g, '-').toLowerCase();
  }

  useEffect(() => {
    setUploadProgress(Math.floor(progress));
    console.log(uploadProgress)
  }, [progress]);

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
      await uploadFile('song', file, '3SWiGIUR4zdEvmzQzTEjcdotZ7z1');
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];  // assuming single file selection
    if (file) {
      setFile(file);
      handleFileUpload(file);
    }
  };

  const submitTrack = async () => {
    const formData = new FormData();
    formData.append('userid', "3SWiGIUR4zdEvmzQzTEjcdotZ7z1");
    formData.append('audio', songFile);
    formData.append('artist', songData.artist || uploadData.artist);
    formData.append('title', songData.title || formatTitle(uploadData.title));
    formData.append('fb_id', downloadURL || "");
    socket.connect();
    axios.post('http://localhost:5000/process-audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {

    })

  };

  return (
    <div>
    {
      !uploadData || !uploadData.artist ? (
        <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{'display': 'none'}}
            />
            <div className="upload-container" onClick={onButtonClick}>
              {
                  uploadProgress ? (
                    <div className="progress" style={{width: uploadProgress + '%'}}>
                    </div>
                  ) : null
              }
                <div className="upload-icon">
                    <FaCloudUploadAlt/>
                </div>
                <p className="upload-text">Click to upload a track or Drag and Drop</p>
            </div>
        </div>
      ) : (
        <div>
            <div className="upload-container">
              {
                uploadProgress ? (
                  <div className="progress" style={{width: uploadProgress === 100 ? '0%' : uploadProgress + '%', animation: uploadProgress === 100 ? '0.4s linear fade-out' : ''}}>
                  </div>
                ) : null
              }
              {
                image ? (
                  <div className='cover'>
                    <img src={"data:image/png;base64, "+ image} alt="" srcSet="" />
                  </div>
                ) : null
              }
                <div className='info'>
                  <div>
                    <label className="mb-es" htmlFor='artist'>Artist</label>
                    <input name='artist' placeholder={uploadData.artist} onChange={handleUploadChange}/>
                  </div>
                  <div>
                    <label className="mb-es" htmlFor='album'>Album</label>
                    <input name='album' placeholder={uploadData.album} onChange={handleUploadChange}/>
                  </div>
                  <div>
                    <label className="mb-es" htmlFor='title'>Title</label>
                    <input name='title' placeholder={uploadData.title} onChange={handleUploadChange}/>
                  </div>
                  <div>
                    <label className="mb-es" htmlFor='endpoint'>Profile Endpoint</label>
                    <input name='endpoint' placeholder={"Your song will be uploaded to stellar.app/mikudrip/"+formatTitle(uploadData.title)} onChange={handleUploadChange}/>
                  </div>
                  <div>
                    <label className="mb-es" htmlFor='namespace'>Namespace</label>
                    <select name="namespace" onChange={handleUploadChange} id="">
                      <option value="">Community</option>
                      <option value="">Profile</option>
                      <option value="">Private</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-es" htmlFor='genre'>Genre</label>
                    <select name="genre" onChange={handleUploadChange} id="">
                      <option value="">Community</option>
                      <option value="">Profile</option>
                      <option value="">Private</option>
                    </select>
                  </div>
                </div>
                <button onClick={submitTrack}>Confirm</button>
            </div>
        </div>
      )
    }
    </div>
  )
}

export default Upload