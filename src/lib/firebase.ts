import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCb_BuaKRao4KSEW0LBthvyCTGBvEloJfg",
  authDomain: "nbh-digital.firebaseapp.com",
  databaseURL: "https://nbh-digital-default-rtdb.firebaseio.com",
  projectId: "nbh-digital",
  storageBucket: "nbh-digital.firebasestorage.app",
  messagingSenderId: "762344198197",
  appId: "1:762344198197:web:30eed040cee286afe5617c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

