import React from 'react'

const LibraryCard = ({list, songs}) => {

    function msToMinutesAndSeconds(ms) {
        let minutes = Math.floor(ms / 60000); // 1 minute = 60000 milliseconds
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      }      

  const ListDetails = () => {
    switch (list) {
        case "history":
            return {
                title: "History",
                url: "history.png",
            }
        case "liked":
            return {
                title: "Liked Songs",
                url: "liked.png",
            }
        case "uploads":
            return {
                title: "Uploads",
                url: "uploads.png",
            }
        default:
            return {
                title: "",
                url: "",
            }
    }
  }

  return (
    <div className="playlist-list library-card">
        <div className="playlist-details">
            <div className="playlist-details-main">
                <img src={ListDetails().url}/>
                <div className='u__sh--default--text'>
                <h3 className="playlist-title mb-none">{ListDetails().title}</h3>
                <p className="mt-none">202 results</p>
                </div>
            </div>
        </div>
        <div className="playlist-content-list">
        {
            songs.map((item, index)=>{ return (
                <div className="playlist-content-item">
                    <div className="playlist-content-item-details">
                    <img src={item.coverImageUrl} width={50} height={50} alt="" srcSet="" />
                    <div className='playlist-content-item-title-artist'>
                        <span className='ml-es mb-none'>{item.title}</span>
                        <p className='ml-es mt-none mb-none'>{item.artists[0].displayName}</p>
                    </div>
                    </div>
                    <div>{msToMinutesAndSeconds(item.duration)}</div>
                </div>
            )
            })
        }
        </div>
        <div className="playlist-expand">
        <a href="" className='u__fs__normal'>Show more...</a>
        </div>
    </div>
  )
}

export default LibraryCard