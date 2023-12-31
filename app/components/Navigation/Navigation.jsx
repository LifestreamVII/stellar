import { NavLink } from "@remix-run/react";
import Tooltip from "~/components/Tooltip";
import Expanded from '~/components/Navigation/Expanded';

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
  FaReadme,
} from "react-icons/fa";


const Navigation = (props) => {

  const [expandedMenu, setExpandedMenu] = useState(null);

  const expand = (menu) => {
    if (menu === expandedMenu) setExpandedMenu("");
    else setExpandedMenu(menu);
  }

  const Icon = ({ icon, title, link, expandable=false }) => (
    <li>
      {
        props.isExpanded && expandable ? (
        <NavLink title={title} to="#" onClick={()=>expand(title)}>{icon}
          <div className="menu-details">
                  <span>{title + (expandedMenu === title ? " ˅" : " >")}</span>
          </div>
        </NavLink>
        ) : (
        <NavLink title={title} to={link}>{icon}
          <div className="menu-details">
                  <span>{title}</span>
          </div>
        </NavLink>
        )
      }
    </li>
  );

  return props.user ? (
    <menu>
      <ul className="topMenu">
        <button onClick={props.expandNavbar} className="expand"><FaExpandAlt/></button>
      </ul>
      <ul className='mainMenu'>
        <Tooltip content="Home" position="right">
          <Icon title="Home" link="/" icon={<FaHome />} />
        </Tooltip>
        <Tooltip content="Messages" position="right">
          <Icon expandable title="Messages" link="/messages" icon={<FaEnvelopeOpenText />} />
          { props.isExpanded && expandedMenu === "Messages" ? (
            <Expanded menu="messages"></Expanded>
          ) : ("") }
        </Tooltip>
        <Tooltip content="Upload" position="right">
          <Icon expandable title="Upload" link="/panel" icon={<FaUpload />} />
          { props.isExpanded && expandedMenu === "Upload" ? (
            <Expanded menu="upload"></Expanded>
          ) : ("") }
        </Tooltip>
        <Tooltip content="Communities" position="right">
          <Icon title="Communities" link="/" icon={<FaGlobeAmericas />} />
        </Tooltip>
        <Tooltip content="Library" position="right">
          <Icon expandable title="Library" link="/library" icon={<FaReadme />} />
          { props.isExpanded && expandedMenu === "Library" ? (
            <Expanded menu="library"></Expanded>
          ) : ("") }
        </Tooltip>
      </ul>
      <ul className="lastMenu">
        <Tooltip content="Settings" position="right">
          <Icon title="Settings" link="/" icon={<FaCog />} />
        </Tooltip>
        <Tooltip content="Logout" position="right">
          <Icon title="Sign Out" link="/logout" icon={<FaSignOutAlt />} />
        </Tooltip>
      </ul>
    </menu>
  ) : ""
}

export default Navigation