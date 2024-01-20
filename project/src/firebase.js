import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBOPqRZl92E4WJzf2yepJJZ2DMUGJQjHeE",
    authDomain: "easyway-ae8f9.firebaseapp.com",
    projectId: "easyway-ae8f9",
    storageBucket: "easyway-ae8f9.appspot.com",
    messagingSenderId: "79275993277",
    appId: "1:79275993277:web:b07ee1cd0b35e528816fd4",
    measurementId: "G-MMTQ5W48FM"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = getStorage(firebaseApp)
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

export { auth, googleProvider, githubProvider, facebookProvider, twitterProvider, storage }
export default db;