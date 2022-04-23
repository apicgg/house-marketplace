// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBRe4y1x11wEyCS6ZyaJ-ZANcY2PBg41qQ',
  authDomain: 'house-marketplace-app-a4e46.firebaseapp.com',
  projectId: 'house-marketplace-app-a4e46',
  storageBucket: 'house-marketplace-app-a4e46.appspot.com',
  messagingSenderId: '425901427503',
  appId: '1:425901427503:web:a18c2a7f3bb70eea502fda',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
