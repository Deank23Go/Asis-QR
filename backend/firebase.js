require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env
const admin = require("firebase-admin");

// Usar la variable de entorno para cargar la ruta
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
