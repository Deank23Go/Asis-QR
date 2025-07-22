import axios from "axios";

// Configuración automática de entornos
const baseURL = import.meta.env.VITE_BACKEND_URL || 
  (import.meta.env.DEV ? "http://localhost:3000" : "https://asis-qr.onrender.com");

// Instancia optimizada
const instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  timeout: 10000
});

// Interceptor para debug (opcional)
instance.interceptors.request.use(config => {
  console.log(`🌐 Enviando a: ${config.baseURL}${config.url}`);
  return config;
});

export default instance;