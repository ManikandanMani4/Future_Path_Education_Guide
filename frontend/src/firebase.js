import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHw3gY9qRdonmvoBj-JXginuS4BEoo43w",
  authDomain: "education-guide-9d7a8.firebaseapp.com",
  projectId: "education-guide-9d7a8",
  appId: "1:64699508541:web:5262c8592afb3f6cb84754"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();