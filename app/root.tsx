import pico from "@picocss/pico/css/pico.min.css";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { useState, useEffect } from 'react'
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import { json, redirect } from '@remix-run/node';
import Player from "~/components/Player";

import base from "~/styles/system/main.css";
import grid from "~/styles/system/grid.css";
import centra from "~/styles/fonts/centra.css";
import kross from "~/styles/fonts/kross.css";
import stellar from "~/styles/system/partir.css";
import nav from "~/styles/system/navapp.css";
import system from "~/styles/system/system.css";
import player from "~/styles/system/player.css";
import header from "~/styles/system/nav.css";
import tooltip from "~/styles/system/tooltip.css";
import Navigation from "./components/Navigation/Navigation";
import Header from "~/components/Body/Header/Header";
import SplashScreen from './splash'

import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession, checkSessionCookie, commitSession } from "./guard/guard";
import { getCommunities } from "~/scripts/useUser";
import { getCommunity } from "~/scripts/useCommunity";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const user = await checkSessionCookie(session);
  const headers = {
    'Set-Cookie': await commitSession(session)
  };
  if (typeof user === "object" && user.uid) {
    const fetchCommunities = async () => {
      console.log("fetching comms..............")
      const communityIds = await getCommunities(user);
      console.log(communityIds);
      const communitiesData = await Promise.all(
        communityIds.map((id) => getCommunity(id))
      );
      return communitiesData;
    };
    const communities = await fetchCommunities();
    // return get user from db
    return json({ user, communities });
  }
  return json({ user: {uid: null}, communities: [] });
}

export default function App() {

  const [loading, setLoading] = useState(false)

  const { user, communities } = useLoaderData<typeof loader>();

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500)
  }, [])


  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      {loading === false ? (
        <body>
          <div className="container">
            <div className="sidebar">
              <nav>
                <Navigation user={user.uid ? true : false} communities={communities ?? {}} />
                {/* <div>
                  <Header user={user.uid ? user : null} />
                </div> */}
              </nav>
            </div>
            <div className="main-content">
              <Outlet context={user.uid ? user : null} />
              <ScrollRestoration />
              <Scripts />
              <LiveReload />
            </div>
            <div className="player">
              <Player></Player>
            </div>
          </div>
        </body>
      ) : (
        <body>
          <Scripts />
          <LiveReload />
          <SplashScreen />
        </body>
      )}
    </html>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: cssBundleHref },
  { rel: "stylesheet", href: pico },
  { rel: "stylesheet", href: base },
  { rel: "stylesheet", href: centra },
  { rel: "stylesheet", href: kross },
  { rel: "stylesheet", href: grid },
  { rel: "stylesheet", href: nav },
  { rel: "stylesheet", href: system },
  { rel: "stylesheet", href: player },
  { rel: "stylesheet", href: header },
  { rel: "stylesheet", href: tooltip },
  { rel: "stylesheet", href: stellar },
]