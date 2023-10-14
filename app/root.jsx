<<<<<<< Updated upstream
import pico from "@picocss/pico/css/pico.min.css";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import base from "~/styles/system/main.css";
import grid from "~/styles/system/grid.css";
import centra from "~/styles/fonts/centra.css";
import kross from "~/styles/fonts/kross.css";
import stellar from "~/styles/system/partir.css";
import nav from "~/styles/system/navapp.css";
import tooltip from "~/styles/system/tooltip.css";
import play from "~/styles/system/player.css";
import Navigation from "./components/Navigation/Navigation";
import Player from "~/components/Player.jsx";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <Navigation/>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
      <Player></Player>

    </html>
  );
}

export function links() {
  return [
    {rel: "stylesheet", href: pico},
    {rel: "stylesheet", href: base},
    {rel: "stylesheet", href: centra},
    {rel: "stylesheet", href: kross},
    {rel: "stylesheet", href: grid},
    {rel: "stylesheet", href: nav},
    {rel: "stylesheet", href: play},
    {rel: "stylesheet", href: tooltip},
    {rel: "stylesheet", href: stellar},
  ]
=======
import pico from "@picocss/pico/css/pico.min.css";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import {useState, useEffect} from 'react'

import base from "~/styles/system/main.css";
import grid from "~/styles/system/grid.css";
import centra from "~/styles/fonts/centra.css";
import kross from "~/styles/fonts/kross.css";
import stellar from "~/styles/system/partir.css";
import nav from "~/styles/system/navapp.css";
import header from "~/styles/system/nav.css";
import tooltip from "~/styles/system/tooltip.css";
import Navigation from "./components/Navigation/Navigation";
import Header from "~/components/Body/Header/Header.jsx";
import LoadingScreen from './loading'


export default function App() {

  const [loading, setLoading] = useState(true)

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
        <Navigation/>
        <div>
          <Header/>
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
      ) : (
      <body>
        <Scripts />
        <LiveReload />
        <LoadingScreen />
      </body>
      )}
    </html>
  );
}

export function links() {
  return [
    {rel: "stylesheet", href: pico},
    {rel: "stylesheet", href: base},
    {rel: "stylesheet", href: centra},
    {rel: "stylesheet", href: kross},
    {rel: "stylesheet", href: grid},
    {rel: "stylesheet", href: nav},
    {rel: "stylesheet", href: header},
    {rel: "stylesheet", href: tooltip},
    {rel: "stylesheet", href: stellar},
  ]
>>>>>>> Stashed changes
}