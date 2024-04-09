import React from 'react'

const PlaylistList = ({ list }) => {
  return (
    <div className="playlists-list mt-l">
      {list.map((item, index) =>
      (
        <div className="playlist-list-container mb-m">
          <div className="playlist-list">
            <div className="playlist-details">
              <div className="playlist-details-main">
                <img src={item.coverImageUrl}/>
                <div>
                  <h3 className="playlist-title mb-none">{item.displayName}</h3>
                  <p className="mt-none">by mikudrip</p>
                </div>
              </div>
              <div className="playlist-details-date">il y a 3 ans</div>
            </div>
            <div className="playlist-content-list">
              <div className="playlist-content-item">
                <div className="playlist-content-item-details">
                  <i className=""></i>
                  <span>Ad・Lib</span>
                </div>
                <div>85.9K</div>
              </div>
              <div className="playlist-content-item">
                <div className="playlist-content-item-details">
                  <i className=""></i>
                  <span>Ad・Lib</span>
                </div>
                <div>85.9K</div>
              </div>
              <div className="playlist-content-item">
                <div className="playlist-content-item-details">
                  <i className=""></i>
                  <span>Ad・Lib</span>
                </div>
                <div>85.9K</div>
              </div>
              <div className="playlist-content-item">
                <div className="playlist-content-item-details">
                  <i className=""></i>
                  <span>Ad・Lib</span>
                </div>
                <div>85.9K</div>
              </div>
              <div className="playlist-content-item">
                <div className="playlist-content-item-details">
                  <i className=""></i>
                  <span>Ad・Lib</span>
                </div>
                <div>85.9K</div>
              </div>
              <div className="playlist-content-item">
                <div className="playlist-content-item-details">
                  <i className=""></i>
                  <span>Ad・Lib</span>
                </div>
                <div>85.9K</div>
              </div>
            </div>
            <div className="playlist-expand">
              <a href="" className='u__fs__normal'>Show more...</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;