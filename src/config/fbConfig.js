// imports just the base features of the firebase library
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA5zKJl9dNuAQWkE-Qn72Np-CELiRA4Bp4",
  authDomain: "net-ninja-marioplan-43fda.firebaseapp.com",
  databaseURL: "https://net-ninja-marioplan-43fda.firebaseio.com",
  projectId: "net-ninja-marioplan-43fda",
  storageBucket: "net-ninja-marioplan-43fda.appspot.com",
  messagingSenderId: "512485617745",
  appId: "1:512485617745:web:c5c9715d364436ac248870",
  measurementId: "G-SVKXE0EGY5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
