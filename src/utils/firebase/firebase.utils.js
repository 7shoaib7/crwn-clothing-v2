
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAWEdeRV_h9mjyWYmOBIoQPUA-EAEjRcfc",
    authDomain: "crwn-clothing-db-d07e8.firebaseapp.com",
    projectId: "crwn-clothing-db-d07e8",
    storageBucket: "crwn-clothing-db-d07e8.appspot.com",
    messagingSenderId: "676716581027",
    appId: "1:676716581027:web:ae09c397aa3a6d3ac1ef16"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
   
    const userDocRef = doc(db, 'users', userAuth.uid);
   
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
};


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);