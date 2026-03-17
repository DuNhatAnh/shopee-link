import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGffz9GmEobfkvr59fr0hbpDGvWs0JA6E",
  authDomain: "link-shopee-5cb51.firebaseapp.com",
  databaseURL: "https://link-shopee-5cb51-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "link-shopee-5cb51",
  storageBucket: "link-shopee-5cb51.firebasestorage.app",
  messagingSenderId: "58206323085",
  appId: "1:58206323085:web:99ad670d504f70c63c7dc4",
  measurementId: "G-EMT0QDKF77"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
