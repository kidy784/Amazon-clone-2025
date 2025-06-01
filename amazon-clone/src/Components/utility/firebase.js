
// import firebase from "firebase/app";
// import {getAuth}from "firebase/auth"
// import "firebase/compat/firestore"
// import "firebase/compat/auth"

// // Your web app's Firebase configuration
// const firebaseConfig = {
// 	apiKey: "AIzaSyB1qvGXDwyxyMRdE1GLwfvaiEHX7AhoSWs",
// 	authDomain: "clone-11791.firebaseapp.com",
// 	projectId: "clone-11791",
// 	storageBucket: "clone-11791.firebasestorage.app",
// 	messagingSenderId: "108871970230",
// 	appId: "1:108871970230:web:cf18fcb9a89bb2ab0aa517",
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// export const auth=getAuth(app)
// export const db=app.firestore()
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB1qvGXDwyxyMRdE1GLwfvaiEHX7AhoSWs",
	authDomain: "clone-11791.firebaseapp.com",
	projectId: "clone-11791",
	storageBucket: "clone-11791.appspot.com", // fixed typo: should be .appspot.com
	messagingSenderId: "108871970230",
	appId: "1:108871970230:web:cf18fcb9a89bb2ab0aa517",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);