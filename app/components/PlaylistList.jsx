import React from 'react'

const PlaylistList = ({ list }) => {
  return (
    <div class="playlists-list mt-l">
      {list.map((item, index) =>
      (
        <div className="playlist-list-container mb-m">
          <div class="playlist-list">
            <div class="playlist-details">
              <div class="playlist-details-main">
                <img src={item.coverImageUrl}/>
                <div>
                  <h3 className="playlist-title mb-none">{item.displayName}</h3>
                  <p class="mt-none">by mikudrip</p>
                </div>
              </div>
              <div class="playlist-details-date">il y a 3 ans</div>
            </div>
            <div class="playlist-content-list">
              <div class="playlist-content-item">
                <div class="playlist-content-item-details">
                  <i class=""></i>
                  <span>Ad・Lib</span>
                </div>
                <div>85.9K</div>
              </div>
              <div class="playlist-content-item">
                <div class="playlist-content-item-details">
                  <i class=""></i>
                  <span>Ad・Lib</span>
                </div>
                <div>85.9K</div>
              </div>
              <div class="playlist-content-item">
                <div class="playlist-content-item-details">
                  <i class=""></i>
                  <span>Ad・Lib</span>
                </div>
                <div>85.9K</div>
              </div>
              <div class="playlist-content-item">
                <div class="playlist-content-item-details">
                  <i class=""></i>
                  <span>Ad・Lib</span>
                </div>
                <div>85.9K</div>
              </div>
              <div class="playlist-content-item">
                <div class="playlist-content-item-details">
                  <i class=""></i>
                  <span>Ad・Lib</span>
                </div>
                <div>85.9K</div>
              </div>
              <div class="playlist-content-item">
                <div class="playlist-content-item-details">
                  <i class=""></i>
                  <span>Ad・Lib</span>
                </div>
                <div>85.9K</div>
              </div>
            </div>
            <div class="playlist-expand">
              <a href="" className='u__fs__normal'>Show more...</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;