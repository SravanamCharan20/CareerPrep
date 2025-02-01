// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "careerprep-ca195.firebaseapp.com",
  projectId: "careerprep-ca195",
  storageBucket: "careerprep-ca195.firebasestorage.app",
  messagingSenderId: "476318182787",
  appId: "1:476318182787:web:27b457fbe99564cf5c1ab6"
};

// Initialize Firebase and export
export const app = initializeApp(firebaseConfig);