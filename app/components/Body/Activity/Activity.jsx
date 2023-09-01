import React from 'react'

const Activity = () => {

    const elements = [
        {
          comimg: `image-1.jpg`,
          albumcover: `https://lh3.googleusercontent.com/facm7LdEYqnroofy1KyCFmMze3AxbMlwAcSp7JXXZmWIILJk_cQFbeIkHDYx7zLiENZQ2acu0fwcyA5o=w544-h544-l90-rj`,
          artist: "Nobuo Uematsu",
          title: "Descendant of Shinobi"
        },
        {
          comimg: `image-3.jpg`,
          albumcover: `image-4.jpg`,
          artist: "Emily Johnson",
          title: "Sunset Melodies"
        },
        {
          comimg: `image-5.jpg`,
          albumcover: `image-6.jpg`,
          artist: "David Williams",
          title: "Urban Groove"
        },
        {
          comimg: `image-7.jpg`,
          albumcover: `image-8.jpg`,
          artist: "Sophia Walker",
          title: "Dreamy Echoes"
        },
        {
          comimg: `image-9.jpg`,
          albumcover: `image-10.jpg`,
          artist: "Michael Davis",
          title: "Smooth Jazz Vibes"
        },
        {
          comimg: `image-11.jpg`,
          albumcover: `image-12.jpg`,
          artist: "Olivia Turner",
          title: "Moonlight Sonata"
        },
        {
          comimg: `image-13.jpg`,
          albumcover: `image-14.jpg`,
          artist: "Daniel Carter",
          title: "Rhythms of Nature"
        },
        {
          comimg: `image-15.jpg`,
          albumcover: `image-16.jpg`,
          artist: "Grace Adams",
          title: "Enchanted Melodies"
        },
        {
          comimg: `image-17.jpg`,
          albumcover: `image-18.jpg`,
          artist: "Liam Robinson",
          title: "Cityscape Serenade"
        }
      ];
      
      

  return (
    <div>
        <div className="row">
            <div className="u__align--left col-12">
                <h1 className="captionxl u__fs__h1 mb-none">Featured Now</h1>
                <p>This section has just been updated.</p>
                <div className="main-container">
                    <div className='horizontal-scroller'>
                        <div className='content scrollbar-hidden'>
                        {elements.map((el, index) => {
                            return (
                            <div className='single'>
                                <div className='single-info'>
                                    <div className='single-charas'>
                                        <div className='single-charas-content'>
                                            <div className='community-icon'>
                                                <div className='community-icon-circle'>
                                                    <img src={el.comimg} alt="" srcset="" />
                                                </div>
                                            </div>
                                            <div className='single-artist u__fs__small u__c--gray'>
                                                <span>{el.artist}</span>
                                            </div>
                                            <div className='single-title u__fs__h4 mt-none'>
                                                <span>{el.title}</span>
                                            </div>
                                            <div className='single-stats'>
                                                <div className='single-stats-listens'>
                                                    <span>200 listens</span>
                                                </div>
                                                <span>|</span>
                                                <div className='single-stats-date'>
                                                    <span>2 days ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='album-cover'>
                                    <img src={el.albumcover} alt="" srcset="" />
                                </div>
                            </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mt-xl">
            <div className="u__align--left col-12">
                <h1 className="captionxl u__fs__h1 mb-none">Discover</h1>
                <p>This section has just been updated.</p>
                <div className="main-container">
                    <div className='horizontal-scroller'>
                        <div className='content scrollbar-hidden'>
                        {elements.map((el, index) => {
                            return (
                            <div className='single'>
                                <div className='single-info'>
                                    <div className='single-charas'>
                                        <div className='single-charas-content'>
                                            <div className='community-icon'>
                                                <div className='community-icon-circle'>
                                                    <img src={el.comimg} alt="" srcset="" />
                                                </div>
                                            </div>
                                            <div className='single-artist u__fs__small u__c--gray'>
                                                <span>{el.artist}</span>
                                            </div>
                                            <div className='single-title u__fs__h4 mt-none'>
                                                <span>{el.title}</span>
                                            </div>
                                            <div className='single-stats'>
                                                <div className='single-stats-listens'>
                                                    <span>200 listens</span>
                                                </div>
                                                <span>|</span>
                                                <div className='single-stats-date'>
                                                    <span>2 days ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='album-cover'>
                                    <img src={el.albumcover} alt="" srcset="" />
                                </div>
                            </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-10 u__disp--flex u__flex--left">
            </div>
        </div>
    </div>
  )
}

export default Activity