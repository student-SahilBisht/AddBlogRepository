// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA388T0_gi5xa7jMawyGvasjh3GpEs_MAU",
  authDomain: "blogging-app-fbf16.firebaseapp.com",
  projectId: "blogging-app-fbf16",
  storageBucket: "blogging-app-fbf16.appspot.com",
  messagingSenderId: "567496304852",
  appId: "1:567496304852:web:1df2ffdb5cae7c3c6eb341"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
 export const db = getFirestore(app);