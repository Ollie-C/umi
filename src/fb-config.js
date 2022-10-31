// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-9azeNgdT3GUmtEU0c0MaWDGGhsABhLk",
  authDomain: "ecolocation-x.firebaseapp.com",
  projectId: "ecolocation-x",
  storageBucket: "ecolocation-x.appspot.com",
  messagingSenderId: "980556687833",
  appId: "1:980556687833:web:533d609533e9a2c2b6d1c8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
