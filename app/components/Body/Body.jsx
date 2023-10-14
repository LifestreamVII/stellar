import React from 'react'
import body from "~/styles/system/body.css";
import News from "~/components/Body/Top/News.jsx";
import Activity from "~/components/Body/Activity/Activity.jsx";

const Body = () => {
  return (
    <div className="mainContent">
        <div className="bottom flex">
            <div className="row mb-xl">
                <div className="col-10">
                    <News/>
                </div>
            </div>
            <Activity/>
        </div>
    </div>
  )
}

export default Body

export function links() {
    return [
      {rel: "stylesheet", href: body},
    ]
  }