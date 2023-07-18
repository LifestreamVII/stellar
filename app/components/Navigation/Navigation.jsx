import { NavLink } from "@remix-run/react";
import Tooltip from "~/components/Tooltip";

import {
    FaHome,
    FaEnvelopeOpenText,
    FaGlobeAmericas,
    FaQuestion,
    FaCog,
    FaSignOutAlt,
  } from "react-icons/fa";

function Navigation() {
        return (
            <aside>
                <nav>
                    <menu>
                        <ul className="topMenu">
                            <li className="logo">
                                <NavLink to="/" className="navbar__logo--sm" title="Logo"/>
                            </li>
                        </ul>
                        <ul className='mainMenu'>
                            <Tooltip content="Home" position="right">
                                <Icon title="Home" icon={<FaHome />} />
                            </Tooltip>
                            <Tooltip content="Messages" position="right">
                                <Icon title="Messages" icon={<FaEnvelopeOpenText />} />
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
                </nav>
            </aside>
        )
}

const Icon = ({ icon, title }) => (
    <li>
      <NavLink title={title} to="/">{icon}</NavLink>
    </li>
  );

export default Navigation