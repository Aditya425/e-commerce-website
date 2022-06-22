// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAeFQGymf4btPHGaxDmjAfJNuh-m75Ix8",
  authDomain: "e-commerce-website-47683.firebaseapp.com",
  projectId: "e-commerce-website-47683",
  storageBucket: "e-commerce-website-47683.appspot.com",
  messagingSenderId: "937077328842",
  appId: "1:937077328842:web:7810559940cb92c8071d33",
  measurementId: "G-JREXV8EX6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export default db