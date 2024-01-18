import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth, Auth
} from 'firebase/auth';
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDMdRHTbCXcdIrULkn5OM6cYxQ2_EAzusQ",
  authDomain: "stellar-imagine.firebaseapp.com",
  projectId: "stellar-imagine",
  storageBucket: "stellar-imagine.appspot.com",
  messagingSenderId: "440776053738",
  appId: "1:440776053738:web:916b1a3b92cb39c6135893",
  measurementId: "G-XMPVEZGPVP"
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