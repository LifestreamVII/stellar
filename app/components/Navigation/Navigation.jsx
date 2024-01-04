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
  FaCloudDownloadAlt,
  FaHistory,
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
        <Tooltip content="Downloader" position="right">
          <Icon expandable title="Downloader" link="/downloader" icon={<FaCloudDownloadAlt />} />
          { props.isExpanded && expandedMenu === "Downloader" ? (
            <Expanded menu="downloader"></Expanded>
          ) : ("") }
        </Tooltip>
        <Tooltip content="History" position="right">
          <Icon expandable title="History" link="/history" icon={<FaHistory />} />
          { props.isExpanded && expandedMenu === "History" ? (
            <Expanded menu="history"></Expanded>
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