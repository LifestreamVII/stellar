import React, { useState, useRef } from 'react';
import body from "~/styles/system/body.css";
import Activity from "~/components/Body/Activity/Activity.jsx";
import Register from "~/components/Modal/Register.tsx";
import { NavLink } from '@remix-run/react';

const Body = () => {

  const [showRegister, setRegister] = useState(false);

  const openRegister = () => {
    setRegister(true);
  }

  const closeRegister = () => {
    setRegister(false);
  }

  return (
    <div className="">
      {showRegister && (
        <div className="modal-fixed">
          <Register closeRegister={closeRegister}></Register>
        </div>
      )}
      <div className="u__wide u__align--center">
        <h1 className='mt-none mb-none'>Stellar MP3 Downloader</h1>
        <div className='mt-l'>
          <NavLink className='u__disp--inblock u__fs__medium' to="/downloader">
            <button className='u__align--center mr-s'>Download Playlists</button>
          </NavLink>
        </div>
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