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

  const elements2 = [
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
      <div className="row mb-l">
        <div className="u__align--left col-12">
          <h1 className="captionxl u__align--left u__fs__h1 mb-none">Welcome back</h1>
          <p>Resume where you left off.</p>
          <div className="main-container">
            <div className="gradient-cards mt-m">
              <div class="card">
                <div class="container-card bg-white-box u__disp--flex">
                  <h4 className='u__align--left ml-s mt-none mb-none'>History</h4>
                </div>
              </div>
              <div class="card">
                <div class="container-card bg-white-box u__disp--flex">
                  <h4 className='u__align--left u__flex--0 ml-s mt-none mb-none'>Creator Panel</h4>
                </div>
              </div>
            </div>
            <div className='horizontal-scroller'>
              <div className='content scrollbar-hidden'>
                {elements2.map((el, index) => {
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
                      <div className='typeof'>
                      </div>
                      <div className='album-cover bg-single-blue'>
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
      <div className='border-separation'></div>
      <div className="row mt-xl mb-m">
        <div className='u__align--left col-8'>
          <div class="selectable-tags-group">
            <a class="tag pl-m pr-m mr-es" href="https://www.partir.com/ou-partir/janvier/soleil/voyage.html">
              <span>Chill</span>
            </a>
            <a class="tag pl-m pr-m mr-es" href="https://www.partir.com/ou-partir/janvier/soleil/voyage.html">
              <span>New</span>
            </a>
            <a class="tag pl-m pr-m mr-es" href="https://www.partir.com/ou-partir/janvier/soleil/voyage.html">
              <span>Moody</span>
            </a>
            <a class="tag pl-m pr-m mr-es" href="https://www.partir.com/ou-partir/janvier/soleil/voyage.html">
              <span>Popular</span>
            </a>
            <a class="tag pl-m pr-m mr-es" href="https://www.partir.com/ou-partir/janvier/soleil/voyage.html">
              <span>Dark</span>
            </a>
            <a class="tag pl-m pr-m mr-es" href="https://www.partir.com/ou-partir/janvier/soleil/voyage.html">
              <span>Happy</span>
            </a>
            <a class="tag pl-m pr-m mr-es" href="https://www.partir.com/ou-partir/janvier/soleil/voyage.html">
              <span>Future</span>
            </a>
            <a class="tag pl-m pr-m mr-es" href="https://www.partir.com/ou-partir/janvier/soleil/voyage.html">
              <span>Space</span>
            </a>
            <a class="tag pl-m pr-m" href="https://www.partir.com/ou-partir/janvier/soleil/voyage.html">
              <span>Dreamy</span>
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="u__align--left col-12">
          <h1 className="captionxl u__align--left u__fs__h1 mb-none">Featured Now</h1>
          <p>Check out the most streamed content this week in s/PHONK.</p>
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
                      <div className='typeof'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                          <path d="M14.3187 2.50498C13.0514 2.35716 11.8489 3.10033 11.4144 4.29989C11.3165 4.57023 11.2821 4.86251 11.266 5.16888C11.2539 5.40001 11.2509 5.67552 11.2503 6L11.25 6.45499C11.25 6.4598 11.25 6.4646 11.25 6.46938V14.5359C10.4003 13.7384 9.25721 13.25 8 13.25C5.37665 13.25 3.25 15.3766 3.25 18C3.25 20.6234 5.37665 22.75 8 22.75C10.6234 22.75 12.75 20.6234 12.75 18V9.21059C12.8548 9.26646 12.9683 9.32316 13.0927 9.38527L15.8002 10.739C16.2185 10.9481 16.5589 11.1183 16.8378 11.2399C17.119 11.3625 17.3958 11.4625 17.6814 11.4958C18.9486 11.6436 20.1511 10.9004 20.5856 9.70089C20.6836 9.43055 20.7179 9.13826 20.7341 8.83189C20.75 8.52806 20.75 8.14752 20.75 7.67988L20.7501 7.59705C20.7502 7.2493 20.7503 6.97726 20.701 6.71946C20.574 6.05585 20.2071 5.46223 19.6704 5.05185C19.4618 4.89242 19.2185 4.77088 18.9074 4.6155L16.1999 3.26179C15.7816 3.05264 15.4412 2.88244 15.1623 2.76086C14.8811 2.63826 14.6043 2.53829 14.3187 2.50498Z" fill="white" />
                        </svg>
                      </div>
                      <div className='album-cover bg-single-blue'>
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
      <div className='border-separation'></div>
      <div className="row mt-xl">
        <div className="u__align--left col-12">
          <h1 className="captionxl u__align--left u__fs__h1 mb-none">Discover</h1>
          <p>Those just dropped. We thought you might like.</p>
          <div className="main-container">
            <div className='horizontal-scroller'>
              <div className='content scrollbar-hidden'>
                {elements.map((el, index) => {
                  return (
                    <div className='single bg-single-blue'>
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
      <div className='border-separation'></div>
      <div className="row">
        <div className="col-10 u__disp--flex u__flex--left">
        </div>
      </div>
    </div>
  )
}

export default Activity