import React, { useState } from "react";

const News = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={isHovered ? "expanded carousel" : "carousel"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <div className="background">
          <img src="https://www.supercars.net/blog/wp-content/uploads/2020/09/wallpaperflare.com_wallpaper-1-1.jpg" alt="" srcset="" />
        </div>
        <div className='masked-background'></div>
        <div className='more-options'>
          <span>...</span>
        </div>
        <div className='info-wrapper'>
          <div className="top-wrapper">
            <div className="thumbnail">
              <div className="thumbnail-caption">
                <p>Lorem Ipsum</p>
              </div>
              <div className='thumbnail-image'>
                <img src="https://img.freepik.com/premium-photo/modern-cars-are-studio-room_37416-14.jpg?w=2000" alt="" srcset="" />
              </div>
            </div>
            <div className='play-btn'>
              <button></button>
            </div>
          </div>
          <div className='bottom-wrapper'>
            <div className='info-data'>
              <div className="title-stats">
                <div className="title">
                  <span className='captionxl u__sh--default--text'>s/Phonk</span>
                </div>
                <div className="stats">
                  <i></i><span>236 streams</span>
                  <i></i><span>236 members</span>
                  <i></i><span>236 songs</span>
                </div>
              </div>
              <div className="description">
                <p>Community created by x.</p>
              </div>
            </div>
            <div className='details'><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos tempore officiis explicabo cupiditate ea similique aperiam repellendus eius quibusdam, quasi, vel sed! Ab earum excepturi rerum aperiam optio adipisci modi.</p></div>
            <div className="carousel-position">
              <ul>
                <li></li>
                <li className='selected'></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  )
}

export default News