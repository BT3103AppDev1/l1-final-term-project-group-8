import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAEAiiQiW8vn5o7dx_ab4iD7s4FVWhnPNY",
    authDomain: "novel-bridge.firebaseapp.com",
    projectId: "novel-bridge",
    storageBucket: "novel-bridge.appspot.com",
    messagingSenderId: "986585485307",
    appId: "1:986585485307:web:6a71bf9a436d82219b055e",
    measurementId: "G-ZC2DQFH15G"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  
  export default firebaseApp;