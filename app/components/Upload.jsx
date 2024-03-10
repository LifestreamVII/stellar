import React, { useRef, useState } from 'react'
import {
    FaCloudUploadAlt,
  } from "react-icons/fa";

const Upload = () => {

  const [songData, setSongData] = useState(null);
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
      console.log(image)
      result.img = window.btoa(binary);
      console.log(result.img)
      setSongData(result);  
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];  // assuming single file selection
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div>
    {
      !songData ? (
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
                <img src={"data:image/png;base64, "+ songData.img} alt="" srcset="" />
                <p className="upload-text">Click to upload a track or Drag and Drop</p>
            </div>
        </div>
      )
    }
    </div>
  )
}

export default Upload