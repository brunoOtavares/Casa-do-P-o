import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB0lGmGioZAd0e-iifIt8vMqAvr5xOmNCw",
  authDomain: "padaria-casa-do-pao.firebaseapp.com",
  projectId: "padaria-casa-do-pao",
  storageBucket: "padaria-casa-do-pao.firebasestorage.app",
  messagingSenderId: "886047225891",
  appId: "1:886047225891:web:d0f9cfd74a172313269996",
  measurementId: "G-QN341JJX7X"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

// Inicializar Authentication
export const auth = getAuth(app);

export default app;
