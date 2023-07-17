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
                            <Tooltip content="tooltip" position="right">
                                <Icon title="Home" icon={<FaHome />} />
                            </Tooltip>
                            <Icon title="Messages" icon={<FaEnvelopeOpenText />} />
                            <Icon title="Communities" icon={<FaGlobeAmericas />} />
                            <Icon title="Help" icon={<FaQuestion />} />
                        </ul>
                        <ul className="lastMenu">
                            <Icon title="Settings" icon={<FaCog />} />
                            <Icon title="Sign Out" icon={<FaSignOutAlt />} />
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