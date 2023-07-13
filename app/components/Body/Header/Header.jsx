import React from 'react'
import header from "~/styles/system/nav.css";

import {
    FaHome,
  } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
        <div class="navbar">
            <div class="navbar__left">
                <NavLink to="/">{ FaHome }</NavLink>
            </div>
            <div className="navbar__middle">
                <input className="mb-none u__disp--block" type="search" id="search" name="search" placeholder="Search" />
            </div>
            <div className="navbar__right">
                <div className="u__disp--flex u__flex--left">
                    <div className="profilepic">
                        <img src="https://yt3.ggpht.com/95BEhKpo0Q3wzmt3jIFCtCeRhECpj5i8a3k4t8yBx6aYK3BD6Z0oCLa7slynPGq1fUHNCZ_w=s88-c-k-c0x00ffffff-no-rj-mo" alt="" srcset="" />
                    </div>
                    {/* <span className="ml-es" style={{"line-height":0}}>LifestreamVII</span> */}
                    <div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}
export default Header

export function links() {
    return [
      {rel: "stylesheet", href: header},
    ]
  }