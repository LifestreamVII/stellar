import React, { useState, useRef } from 'react';
import body from "~/styles/system/body.css";
import News from "~/components/Body/Top/News.jsx";
import Activity from "~/components/Body/Activity/Activity.jsx";
import Register from "~/components/Modal/Register.tsx";
import { uploadFile } from '~/scripts/useUpload.ts';

const Body = () => {

  const [showRegister, setRegister] = useState(false);

  const openRegister = () => {
    setRegister(true);
  }

  const closeRegister = () => {
    setRegister(false);
  }

  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/upload', { // update this to your uploading endpoint
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }
      console.log(result);
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
    <div className="mainContent">
      {showRegister && (
        <div className="modal-fixed">
          <Register closeRegister={closeRegister}></Register>
        </div>
      )}
             <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{'display': 'none'}}
          />
        <button style={{'display': 'none'}} onClick={onButtonClick}>Upload Song</button>
      <div className="bottom flex">
        <div className="row mb-xl">
          <div className="col-10">
            <News />
          </div>
        </div>
        <Activity />
      </div>
    </div>
  )
}

export default Body

export function links() {
  return [
    { rel: "stylesheet", href: body },
  ]
}