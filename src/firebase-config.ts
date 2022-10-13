import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "bookmark-manager-c52b8.firebaseapp.com",
    projectId: "bookmark-manager-c52b8",
    storageBucket: "bookmark-manager-c52b8.appspot.com",
    messagingSenderId: "715126994067",
    appId: "1:715126994067:web:1e19f0181d4cd89a8e0966"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
