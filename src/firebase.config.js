import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const cleanEnv = (val, fallback) => (val ? String(val).trim() : fallback);

const firebaseConfig = {
  apiKey: cleanEnv(import.meta.env.VITE_FIREBASE_API_KEY, "dummy-key-for-development"),
  authDomain: cleanEnv(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, "dummy-domain.firebaseapp.com"),
  projectId: cleanEnv(import.meta.env.VITE_FIREBASE_PROJECT_ID, "dummy-project"),
  storageBucket: cleanEnv(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, "dummy-project.appspot.com"),
  messagingSenderId: cleanEnv(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, "1234567890"),
  appId: cleanEnv(import.meta.env.VITE_FIREBASE_APP_ID, "1:12345:web:12345")
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
