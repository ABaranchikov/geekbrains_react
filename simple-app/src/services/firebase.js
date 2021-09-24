import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBQ56pLLVmxTIq7iXUUrAgB-GCsx34SW9U",
    authDomain: "gb-react-simple-project.firebaseapp.com",
    databaseURL: "https://gb-react-simple-project-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "gb-react-simple-project",
    storageBucket: "gb-react-simple-project.appspot.com",
    messagingSenderId: "927174901493",
    appId: "1:927174901493:web:a8dcc75d3c9865a661cfbc",
    measurementId: "G-LY2N2TLYSV"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getDatabase();

export const signUp = async (email, pass) => {
    await createUserWithEmailAndPassword(auth, email, pass);
}

export const login = async (email, pass) => {
    await signInWithEmailAndPassword(auth, email, pass);
}

export const signOut = async () => {
    await firebaseSignOut(auth);
}