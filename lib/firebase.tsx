// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDP7UhoBhb3cGzNZC1gu8eErWbb_1aYP4I',
  authDomain: 'devot-time.firebaseapp.com',
  projectId: 'devot-time',
  storageBucket: 'devot-time.appspot.com',
  messagingSenderId: '9742799949',
  appId: '1:9742799949:web:192087ad0ac3fb5c237804',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
