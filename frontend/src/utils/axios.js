import axios from 'axios';

// Configuración de Axios
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,  // URL del backend desde el archivo .env
  timeout: 10000,  // Tiempo de espera de 10 segundos
  headers: {
    'Content-Type': 'application/json',  // Establece el tipo de contenido para solicitudes JSON
  },
  withCredentials: true,  // Permitir el envío de cookies con la solicitud
});

console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL); // Verifica que la URL esté cargada correctamente

export default instance;
