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

// .parent {
// display: grid;
// grid-template-columns: 0.4fr repeat(2, 1fr);
// grid-template-rows: 0.3fr 1fr 0.3fr;
// grid-column-gap: 0px;
// grid-row-gap: 0px;
// }

// .div1 { grid-area: 1 / 1 / 4 / 2; }
// .div2 { grid-area: 1 / 2 / 2 / 4; }
// .div3 { grid-area: 2 / 2 / 3 / 4; }
// .div4 { grid-area: 3 / 2 / 4 / 4; }

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
      <div className='row mb-xl'>
        <div className='col-9'>
          <News />
        </div>
      </div>
      <div className="bottom">
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