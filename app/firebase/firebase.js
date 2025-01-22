// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";
import { getMessaging } from 'firebase/messaging' 

const firebaseConfig = {
  apiKey: "AIzaSyCR_bAqAr4v8hPKCdXAkaUKqFcsps9ykGY",
  authDomain: "fir-task-ad9d9.firebaseapp.com",
  projectId: "fir-task-ad9d9",
  storageBucket: "fir-task-ad9d9.firebasestorage.app",
  messagingSenderId: "573063164996",
  appId: "1:573063164996:web:6a98aa6f7f1781e5887811",
  measurementId: "G-ZT4NPECBN2"
};

const app = initializeApp(firebaseConfig);

let messaging;
if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
  messaging = getMessaging(app);
}

export { app, messaging };

