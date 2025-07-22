require('dotenv').config(); // Añade esto si usas .env localmente

// ConfigDB.js
module.exports = {
  // Neon.tech (producción)
  DATABASE_URL: process.env.DATABASE_URL || null,

  // Configuración local (solo desarrollo)
  DB_USER: process.env.DB_USER || 'postgres',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || 'Asis_QR',
  DB_PASSWORD: process.env.DB_PASSWORD || 'admin',
  DB_PORT: process.env.DB_PORT || 5432,

  // Otros
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  PORT: process.env.PORT || 3000
};
// Configuración de la base de datos y otros parámetros
// Asegúrate de que las variables de entorno estén definidas en tu archivo .env