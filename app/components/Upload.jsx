import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react'
import {
  FaCheckCircle,
    FaCloudUploadAlt,
  } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUpload from '~/scripts/useUpload';
import useWebSocket from '~/scripts/useWebSocket';
import fbGenId from '~/scripts/fbGenId';


const Upload = () => {

  const [songData, setSongData] = useState({album: "", title: "", artist: ""})
  const [songFile, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const {uploadFile, tags:uploadData, progress, downloadURL, image, setImage} = useUpload();
  const {uploadFile:uploadImg, progress:progressImg, downloadURL:downloadImg} = useUpload();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [finished, setFinished] = useState(false);
  const { socket } = useWebSocket("3SWiGIUR4zdEvmzQzTEjcdotZ7z1", "toast");

  const formatTitle = (title) => {
    return title.replace(/\s+/g, '-').toLowerCase();
  }

  const getFileFromBase64 = (string64, fileName, type) => {
    const imageContent = atob(string64);
    const buffer = new ArrayBuffer(imageContent.length);
    const view = new Uint8Array(buffer);
  
    for (let n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }
    const blob = new Blob([buffer], { type });
    return new File([blob], fileName, { lastModified: new Date().getTime(), type });
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let res = reader.result;
      let base64String;
      // Find the index of the comma separating the metadata and the base64 data
      const commaIndex = res.indexOf(',');
      if (commaIndex !== -1) {
          // Trim the metadata and keep only the base64 data
          base64String = res.substring(commaIndex + 1);
      }
      const format = res.substring(5, res.indexOf(';')); // Extracting format
      resolve({base64String, format});
    };
    reader.onerror = reject;
  });


  useEffect(() => {
    if (progress === 100 && progressImg > 0) {
      setUploadProgress(Math.floor(progressImg));
    } else {
      setUploadProgress(Math.floor(progress));
    }
  }, [progress, progressImg]);

  const handleUploadChange = (event) => {
    switch (event.target.name) {
        case "visibility":
        songData.visibility = event.target.value;
        break;
        case "genre":
        songData.genre = event.target.value;
        break;
        case "endpoint":
        songData.endpoint = event.target.value;
        break;
        case "title":
        songData.title = event.target.value;
        break;
    }
  }

  const checkFields = () => {
    if (!songData.title) {
      setError("Please enter a title");
      return false;
    }
    if (!songData.endpoint) {
      setError("Please enter a profile endpoint");
      return false;
    }
    if (!songData.visibility) {
      setError("Please select upload's visibility");
      return false;
    }
    if (!songData.genre) {
      setError("Please select a genre");
      return false;
    }
    setError("");
    return true;
  }

  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handleFileUpload = async (file) => {
    setBusy(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('usage', 'song');
    try {
      await uploadFile('song', file, '3SWiGIUR4zdEvmzQzTEjcdotZ7z1');
    } catch (err) {
      console.log(err);
    }
    finally {
      setBusy(false);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];  // assuming single file selection
    if (file) {
      setFile(file);
      handleFileUpload(file);
    }
  };
  const handleImageChange = async (event) => {
    const img = event.target.files[0];  // assuming single file selection
    if (img) {
      const b64 = await toBase64(img);
      setImage(b64.base64String);
      setSongData({...songData, img_type: b64.format})
    }
  };

  const submitTrack = async () => {
    if (checkFields()) {
    setBusy(true);
    const formData = new FormData();
    if (image && (uploadData.image || songData.img_type)) {     
      const format = uploadData.image ? uploadData.image.mime.replace('image/','') : songData.img_type.replace('image/','');
      const fname = 'cover.'+format;
      const img = getFileFromBase64(image, fname, uploadData.image ? uploadData.image.mime : songData.img_type);
      await uploadImg('image', img, '3SWiGIUR4zdEvmzQzTEjcdotZ7z1');
    }
      formData.append('img_url', downloadImg || "");
      formData.append('userid', "3SWiGIUR4zdEvmzQzTEjcdotZ7z1");
      formData.append('audio', songFile);
      formData.append('title', songData.title || uploadData.title);
      formData.append('visibility', songData.visibility);
      formData.append('endpoint', songData.endpoint);
      formData.append('genre', songData.genre);
      formData.append('fb_id', downloadURL || "");
      socket.connect();
      axios.post('http://localhost:5000/process-audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(async (response) => {
        setBusy(false);
        setFinished(true);
        console.log(response);
      })
    }
  };

  return (
    <div>
    {
      !uploadData || !uploadData.done ? (
        <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{'display': 'none'}}
            />
            <div className="upload-container" disabled={busy} onClick={onButtonClick}>
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
        finished ? (
          <div className="upload-container">
            <div className="upload-icon">
                <FaCheckCircle/>
            </div>
            <p className="upload-text">Thanks, we're working on your upload.</p>
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
                  <div className='cover'>
                    <div className={image ? 'cta onhover' : 'cta'}>
                      <FaCloudUploadAlt></FaCloudUploadAlt>
                      <p>Upload Cover Art</p>
                      <input type="file" onChange={handleImageChange} name="coverart" id="" />
                    </div>
                  {
                    image && typeof image === "string" ? (
                      <img src={image.slice(0, 4) === "data" ? image : "data:image/png;base64, "+ image} alt="" srcSet="" />
                    ) : null
                  }
                  </div>
                <div className='info'>
                  <div>
                    <label className="mb-es" htmlFor='title'>Title</label>
                    <input name='title' placeholder={uploadData.title ?? ''} onChange={handleUploadChange}/>
                  </div>
                  <div>
                    <label className="mb-es" htmlFor='endpoint'>Profile Endpoint</label>
                    <input name='endpoint' placeholder={uploadData.title ? "Your song will be uploaded to stellar.app/mikudrip/"+formatTitle(uploadData.title) : ''} onChange={handleUploadChange}/>
                  </div>
                  <div>
                    <label className="mb-es" htmlFor='visibility'>Visibility</label>
                    <select name="visibility" onChange={handleUploadChange} id="">
                      <option value="community">Community</option>
                      <option value="profile">Profile</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-es" htmlFor='genre'>Genre</label>
                    <select name="genre" onChange={handleUploadChange} id="">
                      <option value="genre">Community</option>
                      <option value="genre">Profile</option>
                      <option value="genre">Private</option>
                    </select>
                  </div>
                </div>
                <button onClick={submitTrack}>Confirm</button>
                {
                  error ? (
                    <p className='u__c--red u__semibold u__width--full mt-s'>{error}</p>
                  ) : null
                }
            </div>
        </div>
      ))
    }
    </div>
  )
}

export default Upload