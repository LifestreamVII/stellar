// ...............
// Imports & Setup
// ...............


import { createCookieSessionStorage, redirect, json, Session, createCookie } from '@remix-run/node';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, getDocs } from "firebase/firestore";
import { auth as clientAuth, db } from '~/utils/firebase.config';
import { getAuth } from 'firebase/auth';
import { session } from "~/cookies";
import { auth as serverAuth } from "~/firebase.server";


// ...............
// Session Setup
// ...............

// Retrieve the session secret from the environment variables
const sessionSecret = 'some secret';

// Throw an error if the session secret is not set
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

// Define the structure of the login data
type Login = {
  username: string;
  password: string;
}

// Define the structure of the Admin object
type Admin = {
  userId: string;
}

// Create session management functions using cookie storage
let { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: '__session',
    //secure: true, // HTTPS Only
    secure: false,
    secrets: [sessionSecret],
    sameSite: 'lax', // to help with CSRF
    maxAge: 60 * 60 * 24 * 5, // 5 days
    httpOnly: true,
  },
});

const tokenCookie = createCookie("spotify-token", {
  maxAge: 3600, // Set it according to your expires_in value
  path: "/",
});

// ..............................
// Auth and User functions
// ..............................

// Function to get the user session from the request
async function getUserSession(request: Request) {
  return await getSession(request.headers.get('Cookie'));
}

async function checkSessionCookie(session: Session) {
  try {
    const decodedIdToken = await serverAuth.verifySessionCookie(session.get('session') || '');
    return decodedIdToken;
  } catch (e) {
    console.log(e);
    return { uid: undefined };
  }
};

async function requireAuth(request: Request, redirectTo = new URL(request.url).pathname) {
  const session = await getSession(request.headers.get('Cookie'));
  const { uid } = await checkSessionCookie(session);
  if (!uid) {
    const searchParams = new URLSearchParams([
      ["redirectTo", redirectTo],
    ]);
    throw redirect(`/login?${searchParams}`);
  }
  return serverAuth.getUser(uid);
};


async function getUserId(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));
  const { uid } = await checkSessionCookie(session);
  if (!uid || typeof uid !== "string") return null;
  return uid;
}

// Function to sign in a user with email and password
async function signInUser({ username, password }: Login) {
  const { user } = await signInWithEmailAndPassword(
    clientAuth,
    username,
    password
  );

  const idToken = await user.getIdToken();
  const expiresIn = 1000 * 60 * 60 * 24 * 7; // 1 week
  const sessionCookie = await serverAuth.createSessionCookie(idToken, {
    expiresIn,
  });
  return { sessionCookie, user };
}

const userHasRole = async (userId: string | null, role: string): Promise<Boolean> => {
  try {
    if (!userId) return false;
    const userRecord = await serverAuth.getUser(userId);
    if (userRecord.customClaims && userRecord.customClaims['role'] && userRecord.customClaims['role'][role] === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};


// Function to log out the user and destroy the session
async function logout(request: Request) {
  const session = await getUserSession(request);
  try {
    await signOut(clientAuth);
    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

function requireHTTPS(request: Request) {
  let url = new URL(request.url);
  if (url.protocol === "https:") return;
  url.protocol = "https:";
  throw redirect(url.toString());
}


export { requireHTTPS, getSession, getUserSession, signInUser, userHasRole, logout, requireAuth, getUserId, checkSessionCookie, commitSession, tokenCookie}