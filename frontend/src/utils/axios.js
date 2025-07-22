import axios from "axios";

// 1. Detección INFALIBLE de entorno
const getBaseUrl = () => {
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  return import.meta.env.PROD 
    ? "https://asis-qr.onrender.com" 
    : "http://localhost:3000";
};

// 2. Instancia de Axios con protección contra errores
const instance = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  timeout: 15000
});

// 3. Interceptor para depuración MEJORADO
instance.interceptors.request.use(config => {
  const fullUrl = `${config.baseURL}${config.url}`;
  console.log(`🚀 Petición a: ${fullUrl}`);
  if (fullUrl.includes('localhost') && import.meta.env.PROD) {
    console.error('⚠️ ERROR: Se está usando localhost en producción!');
  }
  return config;
});

export default instance;