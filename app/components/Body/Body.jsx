import React from 'react'
import body from "~/styles/system/body.css";
import News from "~/components/Body/Top/News.jsx";
import Activity from "~/components/Body/Activity/Activity.jsx";
import Register from "~/components/Modal/Register.tsx";

const Body = () => {
  return (
    <div className="mainContent">
      <div className="modal-fixed">
        <Register></Register>
      </div>
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