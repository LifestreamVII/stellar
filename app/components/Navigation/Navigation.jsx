import { NavLink } from "@remix-run/react";
import {
    FaDelicious,
    FaShoppingCart,
    FaWallet,
    FaChartLine,
    FaRegClock,
    FaCog,
    FaSignOutAlt,
  } from "react-icons/fa";

function Navigation() {
        return (
            <aside>
                <nav>
                    <menu>
                        <ul>
                            <li>
                                <NavLink to="/" className="navbar__logo--sm" title="Logo"></NavLink>
                            </li>
                        </ul>
                        <ul id='mainMenu'>
                            <Icon icon={<FaDelicious />} />
                            <Icon icon={<FaShoppingCart />} />
                            <Icon icon={<FaWallet />} />
                            <Icon icon={<FaChartLine />} />
                            <Icon icon={<FaRegClock />} />
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