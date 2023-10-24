// app/firebase.server.ts

import { App, initializeApp, getApps, cert, getApp } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";

let app: App;
let auth: Auth;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(require("../firebase-account.json")),
  });
  auth = getAuth(app);
} else {
  app = getApp();
  auth = getAuth(app);
}

export { auth };

// app/sessions.js
// import { createCookieSessionStorage } from "remix";

// const { getSession, commitSession, destroySession } =
//   createCookieSessionStorage({
//     // a Cookie from `createCookie` or the CookieOptions to create one
//     cookie: {
//         //firebase token
//       name: "fb:token",

//       // all of these are optional
//       expires: new Date(Date.now() + 600),
//       httpOnly: true,
//       maxAge: 600,
//       path: "/",
//       sameSite: "lax",
//       secrets: ["tacos"],
//       secure: true
//     }
//   });

// export { getSession, commitSession, destroySession };

