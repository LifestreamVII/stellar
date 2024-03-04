import React from 'react'
import header from "~/styles/system/nav.css";

export default function Header(props) {

  function TabsBar() {
      return (
          <div className="tabs-bar">
              <Tab text="s/VOCALOID" image="https://cdn.icon-icons.com/icons2/2620/PNG/512/among_us_player_red_icon_156942.png" active />
              <Tab text="s/lr001" image="https://placehold.co/20x20" />
              <Tab text="s/Atmos" image="https://placehold.co/20x20" />
              <Tab text="s/Phonk" image="https://placehold.co/20x20" />
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