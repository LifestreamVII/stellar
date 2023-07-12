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
import centra from "~/styles/fonts/centra.css";
import grid from "~/styles/system/grid.css";
import kross from "~/styles/fonts/kross.css";
import stellar from "~/styles/system/partir.css";
import nav from "~/styles/system/navapp.css";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navigation/>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
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
    {rel: "stylesheet", href: stellar},
  ]
}