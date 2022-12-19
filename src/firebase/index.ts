// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDug3JI46uaZ1fDytPQra1kMpaZzAE58mw",
    authDomain: "traineeprj4.firebaseapp.com",
    projectId: "traineeprj4",
    storageBucket: "traineeprj4.appspot.com",
    messagingSenderId: "570863238804",
    appId: "1:570863238804:web:78f0f37f26039717dcfe81",
    measurementId: "G-0L5X4ZDK4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };