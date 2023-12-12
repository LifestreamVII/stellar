import React from 'react'
import css from "~/styles/panel.css";
import StatsCards from "~/components/StatsCards";
import StorageInfo from "~/components/StorageInfo";
import Upload from "~/components/Upload";

const panel = () => {
  return (
    <div className='container'>
        <div className="mainContent mt-l">
            <div className="row mb-l">
                <div className="u__align--left col-12">
                    <h1 className="captionxl u__align--left u__fs__h1 mb-none">User Panel</h1>
                </div>
            </div>
            <div className='row mb-l'>
              <div className='col-12 col-md-4 u__align--left'>
                <StorageInfo></StorageInfo>
              </div>
              <div className='col-12 col-md-8 u__align--left'>
                <Upload></Upload>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <StatsCards></StatsCards>
              </div>
            </div>
        </div>
    </div>
  )
}

export function links() {
  return [
    { rel: "stylesheet", href: css },
  ]
}

export default panel