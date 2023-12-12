import React from 'react'
import {
    FaCloudUploadAlt,
  } from "react-icons/fa";
  
const Upload = () => {
  return (
    <div>
        <div className="upload-container">
            <div className="upload-icon">
                <FaCloudUploadAlt/>
            </div>
            <p className="upload-text">Click to upload a track or Drag and Drop</p>
        </div>
    </div>
  )
}

export default Upload