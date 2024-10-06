import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCOENaC4vs87NqVzE4Cuz1P-FT22NGBc_g",
  authDomain: "dlearn-b9bc0.firebaseapp.com",
  databaseURL: "https://dlearn-b9bc0-default-rtdb.firebaseio.com/",
  projectId: "dlearn-b9bc0",
  storageBucket: "dlearn-b9bc0.appspot.com",
  messagingSenderId: "160831584585",
  appId: "1:160831584585:web:5b2d28a00d08e4d2990298",
  measurementId: "G-RJRCQVSB3Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };