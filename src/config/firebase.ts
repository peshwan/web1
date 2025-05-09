import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBeO7Wv3gYnfTlk-uibIglv0PxNWii3KI4",
    authDomain: "newtest-583a3.firebaseapp.com",
    databaseURL: "https://newtest-583a3-default-rtdb.firebaseio.com",
    projectId: "newtest-583a3",
    storageBucket: "newtest-583a3.appspot.com",
    messagingSenderId: "1075440781361",
    appId: "1:1075440781361:web:8d58b19fcf513010c42d10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
