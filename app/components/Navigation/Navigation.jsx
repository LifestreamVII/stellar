import { NavLink } from "@remix-run/react";
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
                                <NavLink to="/" className="navbar__logo--sm" title="Logo"></NavLink>
                            </li>
                        </ul>
                        <ul className='mainMenu'>
                            <Icon icon={<FaHome />} />
                            <Icon icon={<FaEnvelopeOpenText />} />
                            <Icon icon={<FaGlobeAmericas />} />
                            <Icon icon={<FaQuestion />} />
                        </ul>
                        <ul className="lastMenu">
                            <Icon icon={<FaCog />} />
                            <Icon icon={<FaSignOutAlt />} />
                        </ul>
                    </menu>
                </nav>
            </aside>
        )
}

const Icon = ({ icon }) => (
    <li>
      <NavLink to="/">{icon}</NavLink>
    </li>
  );

export default Navigation