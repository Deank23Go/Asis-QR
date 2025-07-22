const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const session = require("express-session"); // Importar express-session
const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DATABASE_URL,
  PORT,
  FRONTEND_URL,
} = require("./ConfigDB");

const app = express();


// Configuración dinámica CORS
const corsOptions = {
  origin: [
    'https://asis-qr-1.onrender.com', // URL exacta de tu frontend
    'http://localhost:5173' // Solo desarrollo
  ],
  credentials: true,
  exposedHeaders: ['set-cookie']
};

app.use(cors(corsOptions));

// Middleware para manejar OPTIONS
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.status(200).json({});
  }
  next();
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.json()); // Middleware para parsear solicitudes JSON
console.log("Frontend URL:", process.env.FRONTEND_URL);
// Configuración de express-session para manejar sesiones
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: true, // Solo HTTPS
    sameSite: 'none',
    domain: '.render.com', // Dominio compartido
    maxAge: 86400000
  },
  proxy: true // Requerido para Render
}));

// Configuración del Pool (como ya la tienes)
const poolConfig = DATABASE_URL
  ? {
      connectionString: DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Requerido para Neon.tech
      },
    }
  : {
      user: DB_USER,
      host: DB_HOST,
      database: DB_NAME,
      password: DB_PASSWORD,
      port: DB_PORT,
    };

const pool = new Pool({
  ...poolConfig,
  // Opciones comunes:
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Verificación de conexión
pool
  .connect()
  .then((client) => {
    console.log(
      `✅ Conectado a ${
        DATABASE_URL
          ? "Neon.tech (Producción)"
          : "PostgreSQL Local (Desarrollo)"
      }`
    );
    client.release();
  })
  .catch((err) => {
    console.error("❌ Error de conexión:", err.message);
    process.exit(1);
  });

  // Ruta de prueba
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'online',
    db: DATABASE_URL ? 'Neon.tech' : 'Local',
    frontend: FRONTEND_URL
  });
});

module.exports = { app, pool };

// Configuración de Multer para manejar la subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    ); // Generamos un nombre único para la imagen
  },
});
const upload = multer({ storage: storage });

// Sirve archivos estáticos desde la carpeta 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ruta para registrar un usuario
app.post("/api/register", upload.single("imagen"), async (req, res) => {
  const {
    uid,
    username,
    email,
    telefono,
    role,
    nivel,
    facultad,
    carrera,
    password,
  } = req.body;
  const imagen = req.file ? req.file.path.replace("\\", "/") : null;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (uid, email, nombre, telefono, imagen, role, nivel, facultad, carrera, password) " +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        uid,
        email,
        username,
        telefono,
        imagen,
        role,
        nivel,
        facultad,
        carrera,
        hashedPassword,
      ]
    );

    res.status(201).json(newUser.rows[0]); // Respondemos con el nuevo usuario creado
  } catch (err) {
    console.error("Error al registrar el usuario:", err);
    res
      .status(500)
      .json({ error: "Error al registrar el usuario. Intenta de nuevo." });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ error: "Correo electrónico o contraseña incorrectos" });
    }

    const user = result.rows[0];

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ error: "Correo electrónico o contraseña incorrectos" });
    }

    // Guardar el uid y otros datos del usuario en la sesión
    req.session.uid = user.uid; // Aquí guardas el uid del usuario en la sesión
    req.session.email = user.email;

    res.json({
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        imagen: user.imagen,
        telefono: user.telefono,
        nivel: user.nivel,
        facultad: user.facultad,
        carrera: user.carrera,
        role: user.role, // Asegúrate de incluir el role
      },
    });
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    res
      .status(500)
      .json({ error: "Error al intentar iniciar sesión. Intenta de nuevo." });
  }
});

app.get("/api/user", async (req, res) => {
  const { uid } = req.session; // Obtener el UID de la sesión

  if (!uid) {
    return res.status(401).json({ error: "No autenticado" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE uid = $1", [
      uid,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const userData = result.rows[0];

    res.json({
      nombre: userData.nombre,
      email: userData.email,
      telefono: userData.telefono,
      role: userData.role,
      nivel: userData.nivel,
      facultad: userData.facultad,
      carrera: userData.carrera,
      imagen: userData.imagen,
    });
  } catch (err) {
    console.error("Error al obtener los datos del usuario:", err);
    res.status(500).json({ error: "Error al obtener los datos del usuario" });
  }
});

// Ruta para cerrar sesión en el servidor
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error al cerrar sesión" });
    }
    res.status(200).json({ message: "Sesión cerrada correctamente" });
  });
});

// Ruta para registrar un curso
app.post("/api/register-course", async (req, res) => {
  const { courseName, courseDescription, courseSchedule } = req.body;
  const { email } = req.session; // Obtenemos el email del docente desde la sesión

  if (!email) {
    return res.status(401).json({ error: "No autenticado" });
  }

  try {
    // Buscar al docente con el email y obtener su ID
    const result = await pool.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profesor no encontrado" });
    }

    const teacherId = result.rows[0].id; // Obtener el ID del docente

    // Ahora insertamos el curso junto con el email del docente
    await pool.query(
      "INSERT INTO courses (name, description, schedule, teacher_id, teacher_email) VALUES ($1, $2, $3, $4, $5)",
      [courseName, courseDescription, courseSchedule, teacherId, email] // Ahora guardamos el email del docente
    );

    res.status(201).json({ message: "Curso registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el curso:", error);
    res.status(500).json({ error: "Error al registrar el curso" });
  }
});

// Ruta para obtener los cursos del profesor
app.get("/api/courses", async (req, res) => {
  const { email } = req.session; // Obtener el email del docente desde la sesión

  if (!email) {
    return res.status(401).json({ error: "No autenticado" });
  }

  try {
    // Buscar al docente con el email y obtener su ID
    const result = await pool.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profesor no encontrado" });
    }

    const teacherId = result.rows[0].id; // Obtener el ID del docente

    // Obtener los cursos del docente
    const coursesResult = await pool.query(
      "SELECT * FROM courses WHERE teacher_id = $1",
      [teacherId]
    );

    // Verificamos si el docente tiene cursos registrados
    if (coursesResult.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No hay cursos registrados para este profesor" });
    }

    res.json(coursesResult.rows); // Devolver los cursos del docente
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    res.status(500).json({ error: "Error al obtener los cursos" });
  }
});

// Ruta para obtener los cursos del docente
app.get("/api/courses/:teacherId", async (req, res) => {
  const { teacherId } = req.params;

  // Verificamos si el docente está autenticado (es decir, si tiene una sesión activa)
  if (!teacherId) {
    return res.status(401).json({ error: "No autenticado" });
  }

  try {
    // Consultamos los cursos que ha registrado el docente (basado en teacherId)
    const result = await pool.query(
      "SELECT * FROM courses WHERE teacher_id = $1",
      [teacherId]
    );

    // Si no se encuentran cursos, respondemos con un mensaje adecuado
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No tienes cursos registrados" });
    }

    // Respondemos con los cursos encontrados
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener los cursos:", err);
    res.status(500).json({ error: "Error al obtener los cursos" });
  }
});

// Ruta para restablecer la contraseña
app.post("/api/reset-password", async (req, res) => {
  const { email, newPassword } = req.body; // Recibimos el correo electrónico y la nueva contraseña

  try {
    // Verificar si el correo electrónico está registrado
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Correo electrónico no encontrado" });
    }

    // Encriptar la nueva contraseña con bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10); // El número 10 es el número de saltos para bcrypt

    // Actualizar la contraseña en la base de datos
    await pool.query("UPDATE users SET password = $1 WHERE email = $2", [
      hashedPassword,
      email,
    ]);

    res.json({ message: "Contraseña restablecida con éxito" });
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    res
      .status(500)
      .json({ error: "Hubo un error al restablecer la contraseña" });
  }
});

// Ruta para obtener el formulario de asistencia del curso
app.get("/attendance-form/:courseId", async (req, res) => {
  const studentId = req.session.uid; // Obtener el ID del estudiante de la sesión
  const { courseId } = req.params; // Obtener el ID del curso de la URL

  if (!studentId) {
    return res.status(401).json({ error: "No estás autenticado" });
  }

  try {
    // Verificar si el estudiante está inscrito en el curso
    const studentEnrollment = await pool.query(
      "SELECT * FROM enrollments WHERE student_id = $1 AND course_id = $2",
      [studentId, courseId]
    );

    if (studentEnrollment.rows.length === 0) {
      return res.status(403).json({ error: "No estás inscrito en este curso" });
    }

    // Renderizar el formulario de asistencia
    res.render("attendance-form", { courseId }); // Renderizar el formulario de asistencia
  } catch (error) {
    console.error("Error al verificar inscripción en curso:", error);
    res
      .status(500)
      .json({ error: "Error al verificar la inscripción en el curso" });
  }
});

// Ruta para registrar la asistencia del estudiante
app.post("/api/register-attendance", async (req, res) => {
  const { studentName, courseId, attendance } = req.body;
  const studentId = req.session.uid;

  if (!studentId) {
    return res.status(401).json({ error: "No estás autenticado" });
  }

  try {
    // Verificar si el estudiante está inscrito en el curso
    const studentEnrollment = await pool.query(
      "SELECT * FROM enrollments WHERE student_id = $1 AND course_id = $2",
      [studentId, courseId]
    );

    if (studentEnrollment.rows.length === 0) {
      return res.status(403).json({ error: "No estás inscrito en este curso" });
    }

    // Registrar la asistencia
    await pool.query(
      "INSERT INTO attendances (course_id, student_id, student_name, attendance, attendance_time) VALUES ($1, $2, $3, $4, NOW())",
      [courseId, studentId, studentName, attendance]
    );

    // Responder con un mensaje de éxito
    res.json({ message: "Asistencia registrada con éxito" });
  } catch (error) {
    console.error("Error al registrar la asistencia:", error);
    res.status(500).json({ error: "Error al registrar la asistencia" });
  }
});

// Ruta para obtener el historial de asistencias del estudiante
app.get("/api/attendance-history", async (req, res) => {
  const studentId = req.session.uid; // ID del estudiante almacenado en la sesión

  if (!studentId) {
    return res.status(401).json({ error: "No estás autenticado" });
  }

  try {
    // Obtener el historial de asistencias del estudiante
    const result = await pool.query(
      "SELECT courses.name AS course_name, attendances.attendance_time, attendances.attendance, attendances.student_name " +
        "FROM attendances " +
        "JOIN courses ON attendances.course_id = courses.id " +
        "WHERE attendances.student_id = $1 " +
        "ORDER BY attendances.attendance_time DESC",
      [studentId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay registros de asistencia" });
    }

    res.json({ attendanceHistory: result.rows });
  } catch (error) {
    console.error("Error al obtener el historial de asistencias:", error);
    res
      .status(500)
      .json({ error: "Error al obtener el historial de asistencias" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n=== SERVIDOR ACTIVO ===`);
  console.log(`🔗 Frontend: ${FRONTEND_URL}`);
  console.log(`🛢️  Base de datos: ${DATABASE_URL ? 'Neon.tech' : 'Local'}`);
  console.log(`🚀 Servidor: http://localhost:${PORT}\n`);
});
