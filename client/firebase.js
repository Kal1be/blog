// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain: "blog-app-e0103.firebaseapp.com",
  projectId: "blog-app-e0103",
  storageBucket: "blog-app-e0103.appspot.com",
  messagingSenderId: "973911213996",
  appId: "1:973911213996:web:b34167864122b392449c09"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);