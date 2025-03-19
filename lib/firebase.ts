// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp_A_M6mWm2ktvuzMDehymZqsykM-xa9g",
  authDomain: "otp-auth-fc18a.firebaseapp.com",
  projectId: "otp-auth-fc18a",
  storageBucket: "otp-auth-fc18a.firebasestorage.app",
  messagingSenderId: "286924805700",
  appId: "1:286924805700:web:471fb58afd918b4bfb0e11",
  measurementId: "G-6QSJ60BD8D",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// Don't initialize analytics in this fix to avoid additional errors
// We'll focus on fixing the core authentication functionality

export { auth, app }

