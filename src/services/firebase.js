// src/firebase.js
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBXKKjFMzUzsJhOolOUu4edSvTRONcQm68",
    authDomain: "hi-charlie.firebaseapp.com",
    databaseURL: "https://hi-charlie.firebaseio.com",
    projectId: "hi-charlie",
    storageBucket: "",
    messagingSenderId: "344901737843"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.database();
export const auth = firebase.auth();

//export default firebase;
