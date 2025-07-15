// Importa los módulos de Firebase que necesitas
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';  

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBkjqxGYumb3mTHchSSG0JsYSVoTuojM3w",
  authDomain: "proyecto-asis.firebaseapp.com",
  projectId: "proyecto-asis",
  storageBucket: "proyecto-asis.firebasestorage.app",
  messagingSenderId: "176687127198",
  appId: "1:176687127198:web:2f87e26c95c6cb755db98f",
  measurementId: "G-PL49KLTF8S"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener la autenticación de Firebase
const auth = getAuth(app);

// Exportar la autenticación y otras funciones necesarias
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail };
