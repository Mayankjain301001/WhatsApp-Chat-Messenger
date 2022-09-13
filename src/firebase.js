import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBepoipehYoQzdpmgq2n939A_8kbB_-tQA",
    authDomain: "whatsapp-clone-37c34.firebaseapp.com",
    projectId: "whatsapp-clone-37c34",
    storageBucket: "whatsapp-clone-37c34.appspot.com",
    messagingSenderId: "55139956015",
    appId: "1:55139956015:web:053a77f6a3277e6b1addda",
    measurementId: "G-N7NTVBFWZ3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;  
