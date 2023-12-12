import React from 'react'

const StorageInfo = () => {
  return (
    <div className="storage-container">
        <div className="storage-card">
            <div className="logo">
                <img src="https://placehold.co/100x100" alt="Fylo logo" />
                <div>
                    <a href="#"><i className="fas fa-file-alt"></i></a>
                    <a href="#"><i className="fas fa-folder"></i></a>
                    <a href="#"><i className="fas fa-trash-alt"></i></a>
                </div>
            </div>
            <div className="storage-info">
                <p>You've used 815 GB of your storage</p>
                <div className="storage-bar"></div>
                <div className="storage-amount">
                    <span>0 GB</span>
                    <span>1000 GB</span>
                </div>
            </div>
        </div>
        <div className="dialog-bubble">
            <span>185</span>
            <span className="gb-left">GB LEFT</span>
        </div>
    </div>
  )
}

export default StorageInfo