import axios from 'axios';

// Aquí configuramos la URL base (el backend de Node.js)
const instance = axios.create({
  baseURL: 'http://localhost:3000',  // URL de tu backend (ajústala si usas otro puerto o dominio)
  timeout: 10000,  // Configura un tiempo de espera de 5 segundos
  headers: {
    'Content-Type': 'application/json', // Establece el tipo de contenido para solicitudes JSON
  },
  withCredentials: true,  // Permitir el envío de cookies con la solicitud
});

export default instance;
