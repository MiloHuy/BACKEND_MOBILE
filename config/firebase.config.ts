import { FirebaseApp } from '@firebase/app-types';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: 'gs://mobileute-acf54.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp | null;
let firestoreDb = null;

const initializeFirebaseApp = (): FirebaseApp | null => {
  try {
    app = firebase.initializeApp(firebaseConfig);
    firestoreDb = getFirestore(app);
    return app;
  }
  catch (err: any) {
    console.log('err: ' + err);
    return null;
  }
}

const getFirebaseApp = () => app;

export { getFirebaseApp, initializeFirebaseApp };

