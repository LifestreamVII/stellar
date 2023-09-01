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
        <div className='border-separation'></div>

        <div className="row mt-xl mb-l">
            <div className="u__align--left col-12">
                <h1 className="captionxl u__align--left u__fs__h1 mb-none">Welcome back</h1>
                <p>Resume where you left off.</p>
                <div className="main-container">
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
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 24 24" version="1.1">
                                        <title>album_fill</title>
                                        <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g id="Media" transform="translate(0.000000, -48.000000)" fill-rule="nonzero">
                                                <g id="album_fill" transform="translate(0.000000, 48.000000)">
                                                    <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero">

                                    </path>
                                                    <path d="M12,2 C17.5228,2 22,6.47715 22,12 C22,17.5228 17.5228,22 12,22 C6.47715,22 2,17.5228 2,12 C2,6.47715 6.47715,2 12,2 Z M12,10 C10.8954,10 10,10.8954 10,12 C10,13.1046 10.8954,14 12,14 C13.1046,14 14,13.1046 14,12 C14,10.8954 13.1046,10 12,10 Z M11.4402,6.50675 C11.2562,5.98603 10.6849,5.71311 10.1642,5.89715 C8.58138,6.45658 7.26199,7.56735 6.43449,8.99786 C6.15794,9.47592 6.32131,10.0876 6.79937,10.3642 C7.27743,10.6407 7.88916,10.4774 8.1657,9.99931 C8.75788,8.97561 9.70239,8.18161 10.8306,7.78283 C11.3514,7.59879 11.6243,7.02746 11.4402,6.50675 Z" id="形状" fill="white">

                                    </path>
                                                </g>
                                            </g>
                                        </g>
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
                <div className="gradient-cards mt-m">

                <div class="card">
                    <div class="container-card bg-white-box u__disp--flex">
                        <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="118" height="118" rx="24" fill="url(#paint0_linear_1366_4565)" fill-opacity="0.15" stroke="url(#paint1_radial_1366_4565)" stroke-width="2"></rect>
                        <ellipse className='strokesvg' rx="21.9462" ry="22.2891" transform="matrix(0.964749 0.263173 -0.254526 0.967066 60.1463 63.0804)" stroke="white" stroke-width="1.00101" stroke-linecap="round" stroke-dasharray="4 5.01"></ellipse>
                        <path className='fillsvg' xmlns="http://www.w3.org/2000/svg" d="M 46.781 60.07 C 46.781 66.518 52.112 69.954 56.013 73.031 C 57.39 74.116 58.716 75.138 60.042 75.138 C 61.368 75.138 62.694 74.116 64.071 73.031 C 67.973 69.954 73.303 66.518 73.303 60.07 C 73.303 53.621 66.01 49.047 60.042 55.247 C 54.075 49.047 46.781 53.621 46.781 60.07 Z" fill="white"/>
                        <defs>
                            <linearGradient id="paint0_linear_1366_4565" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" stop-opacity="0.7"></stop>
                            <stop offset="0.505208" stop-color="white" stop-opacity="0"></stop>
                            <stop offset="1" stop-color="white" stop-opacity="0.7"></stop>
                            </linearGradient>
                            <radialGradient id="paint1_radial_1366_4565" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 60) rotate(96.8574) scale(122.674 149.921)">
                            <stop stop-color="white"></stop>
                            <stop offset="1" stop-color="#363437" stop-opacity="0.2"></stop>
                            </radialGradient>
                        </defs>
                        </svg>
                        <h4 className='u__align--left ml-s mt-none mb-none'>Favorites</h4>
                    </div>
                </div>
                <div class="card">
                    <div class="container-card bg-white-box u__disp--flex">
                        <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="118" height="118" rx="24" fill="url(#paint0_linear_1366_4565)" fill-opacity="0.15" stroke="url(#paint1_radial_1366_4565)" stroke-width="2"></rect>
                            <ellipse className='strokesvg' rx="21.9462" ry="22.2891" transform="matrix(0.964749 0.263173 -0.254526 0.967066 60.1463 63.0804)" stroke="white" stroke-width="1.00101" stroke-linecap="round" stroke-dasharray="4 5.01"></ellipse>
                            <g xmlns="http://www.w3.org/2000/svg" id="album_fill" transform="matrix(1.175121, 0, 0, 1.175121, 45.797105, 49.144925)">
                                <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"></path>
                                <path className='fillsvg' d="M12,2 C17.5228,2 22,6.47715 22,12 C22,17.5228 17.5228,22 12,22 C6.47715,22 2,17.5228 2,12 C2,6.47715 6.47715,2 12,2 Z M12,10 C10.8954,10 10,10.8954 10,12 C10,13.1046 10.8954,14 12,14 C13.1046,14 14,13.1046 14,12 C14,10.8954 13.1046,10 12,10 Z M11.4402,6.50675 C11.2562,5.98603 10.6849,5.71311 10.1642,5.89715 C8.58138,6.45658 7.26199,7.56735 6.43449,8.99786 C6.15794,9.47592 6.32131,10.0876 6.79937,10.3642 C7.27743,10.6407 7.88916,10.4774 8.1657,9.99931 C8.75788,8.97561 9.70239,8.18161 10.8306,7.78283 C11.3514,7.59879 11.6243,7.02746 11.4402,6.50675 Z" id="形状" fill="white"></path>
                            </g>
                            <defs>
                                <linearGradient id="paint0_linear_1366_4565" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                                <stop stop-color="white" stop-opacity="0.7"></stop>
                                <stop offset="0.5052" stop-color="white" stop-opacity="0"></stop>
                                <stop offset="1" stop-color="white" stop-opacity="0.7"></stop>
                                </linearGradient>
                                <radialGradient id="paint1_radial_1366_4565" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 60) rotate(96.8574) scale(122.674 149.921)">
                                <stop stop-color="white"></stop>
                                <stop offset="1" stop-color="#363437" stop-opacity="0.2"></stop>
                                </radialGradient>
                            </defs>
                        </svg>
                        <h4 className='u__align--left ml-s mt-none mb-none'>Playlists</h4>
                    </div>
                </div>
                <div class="card">
                    <div class="container-card bg-white-box u__disp--flex">
                    <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="118" height="118" rx="24" fill="url(#paint0_linear_1366_4565)" fill-opacity="0.15" stroke="url(#paint1_radial_1366_4565)" stroke-width="2"></rect>
                        <ellipse className='strokesvg' rx="21.9462" ry="22.2891" transform="matrix(0.964749 0.263173 -0.254526 0.967066 60.1463 63.0804)" stroke="white" stroke-width="1.00101" stroke-linecap="round" stroke-dasharray="4 5.01"></ellipse>
                        <g xmlns="http://www.w3.org/2000/svg" id="album_fill" transform="matrix(1.175121, 0, 0, 1.175121, 45.797105, 49.144925)">
                            <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"></path>
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_1366_4565" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" stop-opacity="0.7"></stop>
                            <stop offset="0.5052" stop-color="white" stop-opacity="0"></stop>
                            <stop offset="1" stop-color="white" stop-opacity="0.7"></stop>
                            </linearGradient>
                            <radialGradient id="paint1_radial_1366_4565" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 60) rotate(96.8574) scale(122.674 149.921)">
                            <stop stop-color="white"></stop>
                            <stop offset="1" stop-color="#363437" stop-opacity="0.2"></stop>
                            </radialGradient>
                        </defs>
                        <path className='strokesvg' xmlns="http://www.w3.org/2000/svg" d="M 48.733 60.571 L 54.111 60.571 M 48.733 60.571 L 48.733 55.172 M 48.733 60.571 L 53.224 55.635 C 57.441 51.418 64.279 51.418 68.496 55.635 C 72.713 59.852 72.713 66.689 68.496 70.907 C 64.279 75.124 57.441 75.124 53.224 70.907 C 52.166 69.849 51.373 68.626 50.847 67.32 M 60.86 59.221 L 60.86 64.621 L 64.91 66.646" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                        <h4 className='u__align--left ml-s mt-none mb-none'>History</h4>
                    </div>
                </div>
                <div class="card">
                    <div class="container-card bg-white-box u__disp--flex">
                    <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="118" height="118" rx="24" fill="url(#paint0_linear_1366_4565)" fill-opacity="0.15" stroke="url(#paint1_radial_1366_4565)" stroke-width="2"></rect>
                        <ellipse className='strokesvg' rx="21.9462" ry="22.2891" transform="matrix(0.964749 0.263173 -0.254526 0.967066 60.1463 63.0804)" stroke="white" stroke-width="1.00101" stroke-linecap="round" stroke-dasharray="4 5.01"></ellipse>
                        <g className='fillsvg' xmlns="http://www.w3.org/2000/svg" transform="matrix(0.054521, 0, 0, 0.054521, 46.314934, 49.337556)" fill='white'>
                            <rect x="424" y="24" class="st0" width="48" height="52"></rect>
                            <rect x="424" y="188" class="st0" width="48" height="300"></rect>
                            <path class="st0" d="M484.79,100h-73.578C396.188,100,384,112.188,384,127.211v9.578c0,15.023,12.188,27.21,27.211,27.21h73.578   c15.023,0,27.21-12.187,27.21-27.21v-9.578C512,112.188,499.813,100,484.79,100z"></path>
                            <rect x="231.985" y="24" class="st0" width="48" height="276.641"></rect>
                            <rect x="231.985" y="412.641" class="st0" width="48" height="75.359"></rect>
                            <path class="st0" d="M292.774,324.641h-73.578c-15.023,0-27.21,12.187-27.21,27.211v9.578c0,15.024,12.187,27.211,27.21,27.211   h73.578c15.023,0,27.211-12.187,27.211-27.211v-9.578C319.985,336.828,307.797,324.641,292.774,324.641z"></path>
                            <rect x="40" y="308" class="st0" width="48" height="180"></rect>
                            <rect x="40" y="24" class="st0" width="48" height="172"></rect>
                            <path class="st0" d="M100.79,220H27.211C12.188,220,0,232.188,0,247.211v9.578C0,271.813,12.188,284,27.211,284h73.578   c15.023,0,27.21-12.187,27.21-27.21v-9.578C128,232.188,115.813,220,100.79,220z"></path>
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_1366_4565" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" stop-opacity="0.7"></stop>
                            <stop offset="0.5052" stop-color="white" stop-opacity="0"></stop>
                            <stop offset="1" stop-color="white" stop-opacity="0.7"></stop>
                            </linearGradient>
                            <radialGradient id="paint1_radial_1366_4565" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 60) rotate(96.8574) scale(122.674 149.921)">
                            <stop stop-color="white"></stop>
                            <stop offset="1" stop-color="#363437" stop-opacity="0.2"></stop>
                            </radialGradient>
                        </defs>
                    </svg>
                        <h4 className='u__align--left u__flex--0 ml-s mt-none mb-none'>Creator Panel</h4>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div className='border-separation'></div>

        <div className="row mt-xl mb-l">
            <div className="u__align--left col-12">
                <h1 className="captionxl u__align--left u__fs__h1 mb-none">Made for you</h1>
                <p>Lorem ipsum dolor.</p>
            </div>
        </div>
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
                                    <path d="M14.3187 2.50498C13.0514 2.35716 11.8489 3.10033 11.4144 4.29989C11.3165 4.57023 11.2821 4.86251 11.266 5.16888C11.2539 5.40001 11.2509 5.67552 11.2503 6L11.25 6.45499C11.25 6.4598 11.25 6.4646 11.25 6.46938V14.5359C10.4003 13.7384 9.25721 13.25 8 13.25C5.37665 13.25 3.25 15.3766 3.25 18C3.25 20.6234 5.37665 22.75 8 22.75C10.6234 22.75 12.75 20.6234 12.75 18V9.21059C12.8548 9.26646 12.9683 9.32316 13.0927 9.38527L15.8002 10.739C16.2185 10.9481 16.5589 11.1183 16.8378 11.2399C17.119 11.3625 17.3958 11.4625 17.6814 11.4958C18.9486 11.6436 20.1511 10.9004 20.5856 9.70089C20.6836 9.43055 20.7179 9.13826 20.7341 8.83189C20.75 8.52806 20.75 8.14752 20.75 7.67988L20.7501 7.59705C20.7502 7.2493 20.7503 6.97726 20.701 6.71946C20.574 6.05585 20.2071 5.46223 19.6704 5.05185C19.4618 4.89242 19.2185 4.77088 18.9074 4.6155L16.1999 3.26179C15.7816 3.05264 15.4412 2.88244 15.1623 2.76086C14.8811 2.63826 14.6043 2.53829 14.3187 2.50498Z" fill="white"/>
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