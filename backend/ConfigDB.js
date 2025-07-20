// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();
const { Pool } = require('pg');

// Configuración de la conexión con PostgreSQL usando las variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,        // Usuario de la base de datos
  host: process.env.DB_HOST,        // Dirección del host (Ej. localhost o URL de la base de datos en Render)
  database: process.env.DB_NAME,    // Nombre de la base de datos
  password: process.env.DB_PASSWORD,// Contraseña de la base de datos
  port: process.env.DB_PORT,        // Puerto de la base de datos (generalmente 5432 para PostgreSQL)
});

// Función para obtener el pool
const getPool = () => {
  return pool;
};

// Función para hacer consultas usando el pool
const query = (text, params) => {
  return pool.query(text, params);
};

// Función para obtener una conexión directa al pool
const connect = () => {
  return pool.connect();
};

// Cerrar todas las conexiones del pool
const end = () => {
  return pool.end();
};

// Función para obtener un cliente (usualmente para operaciones manuales con transacciones)
const getClient = async () => {
  const client = await pool.connect();
  return client;
};

// Liberar un cliente
const releaseClient = (client) => {
  if (client) {
    client.release();
  }
};

// Función para hacer una consulta con un cliente específico (útil para transacciones)
const queryWithClient = async (client, text, params) => {
  try {
    const res = await client.query(text, params);
    return res;
  } catch (error) {
    console.error('Error en queryWithClient:', error);
    throw error;
  }
};

// Exportar todo lo necesario
module.exports = {
  pool,
  getPool,
  query,
  connect,
  end,
  getClient,
  releaseClient,
  queryWithClient,
  URL: process.env.URL || 'http://localhost:5173', // Asumiendo que esta variable está en .env
};
