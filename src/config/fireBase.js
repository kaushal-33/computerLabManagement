import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBmeAvex8zEmEfamQHn3ZrRBfD78waZQIY",
    authDomain: "lab-management-6a1c8.firebaseapp.com",
    projectId: "lab-management-6a1c8",
    storageBucket: "lab-management-6a1c8.firebasestorage.app",
    messagingSenderId: "249730945022",
    appId: "1:249730945022:web:147de571cb8c2987f4faaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);