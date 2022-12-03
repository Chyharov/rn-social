import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBiwT4gNNec8rFi7TuY4l--5qFP_zaJ7s",
  authDomain: "testprojectrn-d00a3.firebaseapp.com",
  projectId: "testprojectrn-d00a3",
  storageBucket: "testprojectrn-d00a3.appspot.com",
  messagingSenderId: "74551617164",
  appId: "1:74551617164:web:952234104556cff1287da9",
  measurementId: "G-T7FZPVSLEE",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
