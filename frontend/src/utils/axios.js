import axios from 'axios';

// Configuración robusta de la URL base
const getCorrectBaseURL = () => {
  // Elimina cualquier URL duplicada o mal formada
  const envUrl = import.meta.env.VITE_BACKEND_URL;
  
  if (envUrl) {
    // Limpieza de la URL
    return envUrl.replace(/(https?:\/\/[^/]+).*/, '$1');
  }
  
  return window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'
    : 'https://asis-qr.onrender.com';
};

const instance = axios.create({
  baseURL: getCorrectBaseURL(), // URL limpia y correcta
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para limpiar URLs en las peticiones
instance.interceptors.request.use(config => {
  // Elimina cualquier duplicación en la URL
  if (config.url.startsWith('http')) {
    const urlObj = new URL(config.url);
    config.url = urlObj.pathname + urlObj.search;
  }
  
  console.log(`🌐 Enviando a: ${config.baseURL}${config.url}`);
  return config;
});

// Interceptor para manejar errores 401
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('🔐 Sesión expirada - Redirigiendo a login');
      window.location.href = '/login?sessionExpired=true';
    }
    return Promise.reject(error);
  }
);

export default instance;