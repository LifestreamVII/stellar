import { NavLink } from "@remix-run/react";
import Tooltip from "~/components/Tooltip";

import { Await } from "@remix-run/react";
import { Suspense } from "react";

import { useEffect, useState } from "react";

import { getCommunities } from "~/scripts/useUser";
import { getCommunity } from "~/scripts/useCommunity";

import {
  FaHome,
  FaEnvelopeOpenText,
  FaGlobeAmericas,
  FaQuestion,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Navigation = (props) => {

  const [communities, setCommunities] = useState([]);

  const fetchCommunities = async () => {
    console.log("fetching comms..............")
    if (props.user) {
      const communityIds = await getCommunities();
      console.log(communityIds);
      const communitiesData = await Promise.all(
        communityIds.map((id) => getCommunity(id))
      );
      setCommunities(communitiesData);
      console.log(communities);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return props.user ? (
    <aside>
      <nav>
        <menu>
          <ul className="topMenu">
            <li className="communities">
              <details role="list">
                <summary aria-haspopup="listbox"></summary>
                <ul role="listbox">
                  <Suspense fallback={<p>u smell</p>}>
                    <Await resolve={communities}>
                      {(communities) =>
                        communities.map((community) => (
                          <li key={community.id}><a>{community.displayName}</a></li>
                        ))
                      }
                    </Await>
                  </Suspense>
                </ul>
              </details>
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
  ) : (
    <aside>
      <nav>
        <menu>
          <ul className="topMenu">
            <li className="logo">
              <NavLink to="/" className="navbar__logo--sm" title="Logo" />
            </li>
          </ul>
          <ul className="lastMenu">
            <Tooltip content="Settings" position="right">
              <Icon title="Settings" icon={<FaCog />} />
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