import PlaylistItem from '~/components/PlaylistItem';

const PlaylistList = ({ list, info, reload, loading }) => {

  return (
    <div class="playlists-list mt-l">
        <div className="playlist-list-container mb-m">
          <div class="playlist-list">
            <div class="playlist-details">
              <div class="playlist-details-main">
                <img src={info.images[0].url}/>
                <div className='playlist-details-main-text'>
                  <h4 className="playlist-title mb-none">{info.name}</h4>
                  <p class="mt-none">by {info.owner.display_name}</p>
                </div>
              </div>
              <div class="playlist-type-spotify"></div>
            </div>
            <div class="playlist-content-list">
      {list.map((item, index) =>
      (
        <PlaylistItem key={index} item={item} index={index}></PlaylistItem>
      ))}
            <div class="playlist-expand">
              <button disabled={loading} onClick={reload} className='u__fs__normal'>Show more...</button>
            </div>
          </div>
        </div>
    </div>
  </div>
  );
};

export default PlaylistList;