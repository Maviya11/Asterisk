// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz5h3Mx1MOxyObL6Bxps6r-2HnzDd_5Jg",
  authDomain: "habitica-1a239.firebaseapp.com",
  databaseURL: "https://habitica-1a239-default-rtdb.firebaseio.com",
  projectId: "habitica-1a239",
  storageBucket: "habitica-1a239.appspot.com",
  messagingSenderId: "491271632705",
  appId: "1:491271632705:web:8b74928a627302aaf693c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;