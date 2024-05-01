import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAdguIMdup8yVpYDI00XPv7ry4urzeLdww",
  authDomain: "diary-25328.firebaseapp.com",
  projectId: "diary-25328",
  storageBucket: "diary-25328.appspot.com",
  messagingSenderId: "488846967330",
  appId: "1:488846967330:web:b2288feb2832ce26d8007b"
};

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

const auth = getAuth();

export {database, auth};


