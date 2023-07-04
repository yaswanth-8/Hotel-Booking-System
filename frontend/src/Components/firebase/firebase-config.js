import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBmIuMY2oe3IgudXilsJqmtF4mqz-IsnAs",
  authDomain: "hotel-booking-system-345f9.firebaseapp.com",
  projectId: "hotel-booking-system-345f9",
  storageBucket: "hotel-booking-system-345f9.appspot.com",
  messagingSenderId: "755235082684",
  appId: "1:755235082684:web:2169d38061f31ed5871bb9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();
export { auth, firebase };
