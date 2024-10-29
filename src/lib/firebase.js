import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBBFBkSVeatuy3cqiva403en0zNR6oG9B4',
  authDomain: 'ayushsingh-aa5af.firebaseapp.com',
  databaseURL: 'https://ayushsingh-aa5af-default-rtdb.firebaseio.com',
  projectId: 'ayushsingh-aa5af',
  storageBucket: 'ayushsingh-aa5af.appspot.com',
  messagingSenderId: '662673873377',
  appId: '1:662673873377:web:cb6eaac402724fc5881aa0',
  measurementId: 'G-KJQXVW59VS',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

console.log(db, 'asdadsadadasdad')

export { app, auth, db }
