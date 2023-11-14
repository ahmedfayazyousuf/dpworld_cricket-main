// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app"
import {getStorage} from "firebase/storage"
import "firebase/compat/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKm4uO7ImdxAFpLJE1LtIZURl13M_fwJQ",
  authDomain: "dpworldmotorsportregistration.firebaseapp.com",
  databaseURL: "https://dpworldmotorsportregistration-default-rtdb.firebaseio.com",
  projectId: "dpworldmotorsportregistration",
  storageBucket: "dpworldmotorsportregistration.appspot.com",
  messagingSenderId: "1005649050420",
  appId: "1:1005649050420:web:e51e880ac2490df7040361",
  measurementId: "G-ZDSPQHDH6B"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default firebase; 
export const storage = getStorage(app);
