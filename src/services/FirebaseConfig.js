import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_mwwIgFa8b4sppY_btOKS33Xyl_ia6b4",
  authDomain: "fb-redux-dash.firebaseapp.com",
  projectId: "fb-redux-dash",
  storageBucket: "fb-redux-dash.appspot.com",
  messagingSenderId: "760477599968",
  appId: "1:760477599968:web:74633398d5328b2e1a2885",
  measurementId: "G-LH6JYPPF86",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db=getFirestore(app);
