import React, { useState } from 'react';
import axios from '../utils/axios';  // Tu configuración de Axios
import AvatarUpload from '../components/AvatarUpload';
import PersonalInfoForm from '../components/PersonalInfoForm';
import StudentInfoForm from '../components/StudentInfoForm';
import TeacherInfoForm from '../components/TeacherInfoForm';
import RegisterButton from '../components/RegisterButton';

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [imagen, setImagen] = useState(null);  // Estado para la imagen
  const [role, setRole] = useState(''); // Estado para manejar el rol (Estudiante o Profesor)
  const [nivel, setNivel] = useState('');
  const [facultad, setFacultad] = useState('');
  const [carrera, setCarrera] = useState('');
  const [password, setPassword] = useState('');  // Estado para la contraseña

  // Manejo del envío del formulario
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!nombre || !email || !telefono || !role || !password || !imagen) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    try {
      // Preparamos los datos del usuario para PostgreSQL
      const userData = {
        uid: email,  // Usamos el email como UID temporal, puedes usar otro identificador único
        username: nombre,
        email,
        telefono,
        imagen,
        role,
        nivel,
        facultad,
        carrera,
        password,  // Si no estás cifrando la contraseña aquí, asegúrate de hacerlo en el backend
      };

      // Usar FormData para enviar la imagen y otros datos
      const formData = new FormData();
      formData.append('imagen', imagen);  // Si la imagen es un archivo
      formData.append('uid', userData.uid);
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      formData.append('telefono', userData.telefono);
      formData.append('role', userData.role);
      formData.append('nivel', userData.nivel);
      formData.append('facultad', userData.facultad);
      formData.append('carrera', userData.carrera);
      formData.append('password', userData.password);

      // Enviar la solicitud POST a la API de backend
      const response = await axios.post('http://localhost:3000/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Asegúrate de que el tipo de contenido sea correcto
        },
      });

      console.log('Usuario registrado:', response.data);
      window.location.href = "/Login";  // Redirige al login o dashboard
    } catch (error) {
      setErrorMessage(`Error al registrar el usuario: ${error.message}`);
      console.error('Error al registrar:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-xl space-y-6">
        <h1 className="text-3xl font-semibold text-center text-[#114187]">Registro de Usuario</h1>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Subir Imagen */}
          <div className="flex justify-center relative">
            <AvatarUpload setImagen={setImagen} />
          </div>

          {/* Información Personal */}
          <PersonalInfoForm 
            setNombre={setNombre}
            setEmail={setEmail}
            setTelefono={setTelefono}
            setPassword={setPassword} 
          />

          {/* Selección de rol */}
          <div className="flex-1 group relative bg-white text-gray-500 text-lg px-3 py-1 rounded">
            <label htmlFor="role" className="block text-sm font-medium text-[#114187]">Rol</label>
            <select 
              id="role" 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#124288] focus:border-[#124288] sm:text-sm" 
              required
            >
              <option value="">Selecciona tu rol</option>
              <option value="estudiante">Estudiante</option>
              <option value="profesor">Profesor</option>
            </select>
          </div>

          {/* Mostrar formulario de acuerdo al rol */}
          {role === 'estudiante' && (
            <StudentInfoForm 
              setNivel={setNivel}
              setFacultad={setFacultad}
              setCarrera={setCarrera}
            />
          )}

          {role === 'profesor' && (
            <TeacherInfoForm 
              setFacultad={setFacultad}
              setCarrera={setCarrera}
            />
          )}

          {/* Mensaje de error */}
          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

          <div className="flex justify-center">
            <RegisterButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
