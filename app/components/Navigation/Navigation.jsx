import { NavLink } from "@remix-run/react";
import Tooltip from "~/components/Tooltip";

import { Await } from "@remix-run/react";
import { Suspense } from "react";

import { useEffect, useState } from "react";


import {
  FaHome,
  FaEnvelopeOpenText,
  FaGlobeAmericas,
  FaQuestion,
  FaExpandAlt,
  FaCog,
  FaSignOutAlt,
  FaUpload,
} from "react-icons/fa";


const Navigation = (props) => {

  return props.user ? (
    <menu>
      <ul className="topMenu">
        <button onClick={props.expandNavbar} className="expand"><FaExpandAlt/></button>
      </ul>
      <ul className='mainMenu'>
        <Tooltip content="Home" position="right">
          <Icon title="Home" icon={<FaHome />} />
        </Tooltip>
        <Tooltip content="Messages" position="right">
          <Icon title="Messages" icon={<FaEnvelopeOpenText />} />
        </Tooltip>
        <Tooltip content="Upload" position="right">
          <Icon title="Upload" icon={<FaUpload />} />
        </Tooltip>
        <Tooltip content="Communities" position="right">
          <Icon title="Communities" icon={<FaGlobeAmericas />} />
        </Tooltip>
        <Tooltip content="Help" position="right">
          <Icon title="Help" icon={<FaQuestion />} />
        </Tooltip>
      </ul>
      <ul className="lastMenu">
        <Tooltip content="Settings" position="right">
          <Icon title="Settings" icon={<FaCog />} />
        </Tooltip>
        <Tooltip content="Logout" position="right">
          <Icon title="Sign Out" icon={<FaSignOutAlt />} />
        </Tooltip>
      </ul>
    </menu>
  ) : ""
}

const Icon = ({ icon, title }) => (
  <li>
    <NavLink title={title} to="/">{icon}
      <div className="menu-details">
              <span>{title}</span>
      </div>
    </NavLink>
  </li>
);

export default Navigation