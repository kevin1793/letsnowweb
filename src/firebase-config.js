// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth"
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyB-izYcOSnxKJMpGVgiewJACFz950wSajw",
  authDomain: "letsnowweb.firebaseapp.com",
  projectId: "letsnowweb",
  storageBucket: "letsnowweb.appspot.com",
  messagingSenderId: "796198281704",
  appId: "1:796198281704:web:17084dec04270fd7c1c45d",
  measurementId: "G-P38CTESWFJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db =  getFirestore(app);

const auth = getAuth(app)

export { auth };