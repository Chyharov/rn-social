import * as firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBiwT4gNNec8rFi7TuY4l--5qFP_zaJ7s",
  authDomain: "testprojectrn-d00a3.firebaseapp.com",
  databaseURL: "https://testprojectrn-d00a3-default-rtdb.firebaseio.com",
  projectId: "testprojectrn-d00a3",
  storageBucket: "testprojectrn-d00a3.appspot.com",
  messagingSenderId: "74551617164",
  appId: "1:74551617164:web:952234104556cff1287da9",
  measurementId: "G-T7FZPVSLEE",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

export default firebase;
