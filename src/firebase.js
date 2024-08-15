import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCGqxfATwECYCBICbXRzcsGn2ssTwZ60B0",
  authDomain: "sentiscrap-3947d.firebaseapp.com",
  projectId: "sentiscrap-3947d",
  storageBucket: "sentiscrap-3947d.appspot.com",
  messagingSenderId: "198556353658",
  appId: "1:198556353658:web:b33c8d0cf906d77c2fe7c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
export const auth = getAuth(app);
