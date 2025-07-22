// axios.js (Frontend)
import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL || 
  (import.meta.env.DEV ? 'http://localhost:3000' : 'https://asis-qr.onrender.com');

const instance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000
});

console.log('✅ URL del backend:', baseURL); // Verifica en consola

export default instance;
// Puedes agregar interceptores si es necesario
// instance.interceptors.request.use(...);
