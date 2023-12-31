import React from 'react'

const LibraryCard = ({list}) => {

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
        default:
            return {
                title: "",
                url: "",
            }
    }
  }

  return (
    <div class="playlist-list library-card">
        <div class="playlist-details">
            <div class="playlist-details-main">
                <img src={ListDetails().url}/>
                <div>
                <h3 className="playlist-title mb-none">{ListDetails().title}</h3>
                <p class="mt-none">202 results</p>
                </div>
            </div>
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
  )
}

export default LibraryCard