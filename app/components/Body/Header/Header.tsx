import React from 'react'
import header from "~/styles/system/nav.css";

export default function Header(props) {

  function TabsBar() {
      return (
          <div className="tabs-bar">
              <Tab text="Spotify" image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png" active />
              <Tab text="YouTube" image="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" />
              <Tab text="SoundCloud" image="https://cdn-icons-png.flaticon.com/512/145/145809.png" />
              <Tab text="Bandcamp" image="https://cdn.iconscout.com/icon/free/png-256/free-bandcamp-3521298-2944717.png" />
          </div>
      );
  }

  function Tab({ text, image, active }) {
      return (
          <div className={`tab flex items-center space-x-2 px-4 py-2 tab ${active ? 'tab-active' : ''}`}>
              <img src={image} width={24} height={24} alt={`${text} icon placeholder`} />
              <span>{text}</span>
          </div>
      );
  }

  return props.user ?
    (
      <header className=''>
        <div>
          <div className="">
            <div className="flex items-center space-x-4">
              {
                props.user ? (
                  <div className="user-settings">
                    <img className="user-img" src={props.user.picture} alt="" />
                    <div className="user-name">Logged in as {props.user.name}</div>
                  </div>
                ) : (
                  <div className="user-settings">
                    <a href="login" rel="noopener noreferrer">Login</a>
                  </div>
                )
              }
            </div>
          </div>
          <TabsBar />
        </div>
      </header>
    ) : (
      <header className=''>
        <div className='flex items-center'>
        <div className="user-settings">
          <a href="login" rel="noopener noreferrer">Login</a>
        </div>
        </div>
      </header>
    )
}

export function links() {
  return [
    { rel: "stylesheet", href: header },
  ]
}