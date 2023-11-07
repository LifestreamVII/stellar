import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth, Auth
} from 'firebase/auth';
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
let app;
let db;
let auth: Auth;
let rt;
let storage;

app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
db = getFirestore(app); // new
auth = getAuth(app)
rt = getDatabase(app)
storage = getStorage(app)

export { app, db, auth, rt, storage };