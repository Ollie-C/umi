// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const {
  REACT_APP_FB_API_KEY,
  REACT_APP_authDomain,
  REACT_APP_projectId,
  REACT_APP_storageBucket,
  REACT_APP_messagingSenderId,
  REACT_APP_appId,
} = process.env;

// Log Firebase config for debugging (without revealing sensitive info)
console.log('Firebase Config Status:', {
  apiKeySet: !!REACT_APP_FB_API_KEY,
  authDomainSet: !!REACT_APP_authDomain,
  projectIdSet: !!REACT_APP_projectId,
  storageBucketSet: !!REACT_APP_storageBucket,
  messagingSenderIdSet: !!REACT_APP_messagingSenderId,
  appIdSet: !!REACT_APP_appId,
});

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: REACT_APP_FB_API_KEY,
  authDomain: REACT_APP_authDomain,
  projectId: REACT_APP_projectId,
  storageBucket: REACT_APP_storageBucket,
  messagingSenderId: REACT_APP_messagingSenderId,
  appId: REACT_APP_appId,
};

// Initialize Firebase
let db;
let auth;

try {
  console.log('Initializing Firebase app...');
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);

  // If you want to use the auth emulator during development, uncomment this:
  // if (window.location.hostname === "localhost") {
  //   connectAuthEmulator(auth, "http://localhost:9099");
  // }

  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

export { db, auth };
