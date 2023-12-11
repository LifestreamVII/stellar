import React from 'react'

function Player() {
  return (
    <div className='player'>
        <div class="cover-art"></div>
        <div className='player-info'>
          <div class="previous">
              <h1 className="mb-none u__bold u__fs__normal">PREVIOUS</h1>
              <div className='mb-m'>
                <span>Previous Track</span>
                <span> · </span>
                <span>Previous Artist</span>
              </div>
          </div>
          <div class="track-info">
            <div className='track-info-title'>
              <span>Current Song Title</span>
                <span> · </span>
              <span className='u__bold u__fs__small'>Current Artist</span>
            </div>
              <div class="play-pause-btn">
                  <i class="fas fa-play"></i>
              </div>
          </div>
          <div class="next">
              <h1 className="mb-none u__bold u__fs__normal">NEXT UP</h1>
              <div className='mb-m'>
                <span>Next Track</span>
                <span> · </span>
                <span>Next Artist</span>
              </div>
          </div>
        </div>
        <div class="progress-bar-container">
            <div class="progress-bar"></div>
            <div class="progress-circle"></div>
        </div>
    </div>
  )
}

export default Player