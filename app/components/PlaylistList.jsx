import React from 'react'

const PlaylistList = ({ list }) => {
  return (
    <div class="playlist-list mt-xl">
      {list.map((item, index) => (
        <div key={index} className="row playlist-item">
            <div className='col-8'>
                <img src={item.coverImageUrl} alt={item.displayName} width="100" height="100" className="album-cover" />
                <div className="song-info">
                    <h3 className="song-title">{item.displayName}</h3>
                    <p className="artist-name">by mikudrip</p>
                </div>
                <span className="song-duration">Duration</span>
            </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;