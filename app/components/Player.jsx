import React from 'react'

function Player() {
  return (
    <div className='player'>
        <div className="cover-art"></div>
        <div className='player-info'>
          <div className="previous">
            <h1 className="mb-none u__bold u__fs__normal">PREVIOUS</h1>
            <div className='previous-info'>
              <div className="play-pause-btn"><i className="fas fa-play"></i></div>
              <div className='text'>
                <p className='mb-none mt-none'>Previous Track</p>
                <p className='mb-none mt-none u__bold'>Previous Artist</p>
              </div>
            </div>
          </div>
          <div className="track-info">
            <div className='track-info-title'>
              <span>Current Song Title</span>
                <span> · </span>
              <span className='u__bold u__fs__small'>Current Artist</span>
            </div>
              <div className="play-pause-btn">
                  <i className="fas fa-play"></i>
              </div>
          </div>
          <div className="next">
            <h1 className="mb-none u__bold u__fs__normal">NEXT UP</h1>
            <div className='next-info'>
              <div className='text'>
                <p className='mb-none mt-none'>Next Track</p>
                <p className='mb-none mt-none u__bold'>Next Artist</p>
              </div>
              <div className="play-pause-btn"><i className="fas fa-play"></i></div>
            </div>
          </div>
        </div>
        <div className="progress-bar-container">
            <div className="progress-bar"></div>
            <div className="progress-circle"></div>
        </div>
    </div>
  )
}

export default Player