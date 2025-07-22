// axios.js (Frontend)
import axios from "axios";

const baseURL =
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://asis-qr.onrender.com");

const instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("✅ URL del backend:", baseURL); // Verifica en consola

export default instance;
