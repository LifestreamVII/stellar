import React, { useState } from 'react';
import body from "~/styles/system/body.css";
import News from "~/components/Body/Top/News.jsx";
import Activity from "~/components/Body/Activity/Activity.jsx";
import Register from "~/components/Modal/Register.tsx";

const Body = () => {

  const [showRegister, setRegister] = useState(false);

  const openRegister = () => {
    setRegister(true);
  }

  const closeRegister = () => {
    setRegister(false);
  }

  return (
    <div className="mainContent">
      <button className="openRegister" onClick={openRegister}>
        Register
      </button>
      {showRegister && (
        <div className="modal-fixed">
          <Register closeRegister={closeRegister}></Register>
        </div>
      )}
      <div className="bottom flex">
        <Activity />
        <div className="row mb-xl">
          <div className="col-10">
            <News />
          </div>
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