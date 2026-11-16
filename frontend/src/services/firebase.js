import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAltTEkO-jjfBX3klJrKujRVmTmVOlmhiU',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'stockvision-ai-33a94.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'stockvision-ai-33a94',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'stockvision-ai-33a94.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '978699584293',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:978699584293:web:f103e2b33ecf03da9850cc',
}

let app = null
let authInstance = null
let dbInstance = null

try {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  authInstance = getAuth(app)
  dbInstance = getFirestore(app)
} catch (err) {
  console.warn('Firebase initialization warning:', err)
}

export const auth = authInstance
export const db = dbInstance
export default app
