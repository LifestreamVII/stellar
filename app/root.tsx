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
import Header from "~/components/Body/Header/Header";
import LoadingScreen from './loading'

import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { auth } from "~/firebase.client";
import { onAuthStateChanged } from "firebase/auth";
import { verifyUser } from "~/guard/guard";


export const loader: LoaderFunction = async ({ request }) => {
  let user = await verifyUser(request);
  if (user) {
    return user;
  } else {
    return null;
  }
}

export default function App() {

  const [loading, setLoading] = useState(false)

  const user = useLoaderData<typeof loader>();

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
          <Header user={user ?? null}/>
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
}