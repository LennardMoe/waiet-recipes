import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//init db service

export const db = getFirestore(app);

// init Firestore

export const storage = getStorage(app);

// collection ref

const colRef = collection(db, "recipes");

//get collection
getDocs(colRef).then((snapshot) => {
  let recipes = [];
  snapshot.docs.forEach((doc) => {
    recipes.push({ ...doc.data(), id: doc.id });
  });
});
