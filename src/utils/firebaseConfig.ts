// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMLhv2h-xumLq_tsQvD-cohJMFny0ICE0",
  authDomain: "test-735a9.firebaseapp.com",
  projectId: "test-735a9",
  storageBucket: "test-735a9.firebasestorage.app",
  messagingSenderId: "813726173480",
  appId: "1:813726173480:web:49ed7810ee340936b1681d",
  measurementId: "G-X8TZTHQGT6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
