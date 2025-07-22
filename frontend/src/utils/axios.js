// axios.js (Frontend)
import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL 

const instance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000
});

console.log('✅ URL del backend:', baseURL); // Verifica en consola

export default instance;
