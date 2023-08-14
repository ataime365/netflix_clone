// import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBWp9WrqfIS9_wsfeYnd6zQ3xzG4NjrsyQ",
    authDomain: "netflix-9756c.firebaseapp.com",
    projectId: "netflix-9756c",
    storageBucket: "netflix-9756c.appspot.com",
    messagingSenderId: "696434309715",
    appId: "1:696434309715:web:87662a3a61f1f02971a4a6",
    measurementId: "G-2S86836NZ4"
  };


  // Initialize Firebase
const app =  initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app)

export default storage;