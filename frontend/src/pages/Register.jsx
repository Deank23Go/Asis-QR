import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from '../firebase';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [role, setRole] = useState('');  // Nuevo estado para el rol
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Registrar usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Guardar datos adicionales en Django
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/`, {
        uid: user.uid,
        email: user.email,
        nombre,
        rol: role,  // Guardar el rol seleccionado
      });

      // 3. Redirigir al dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      console.error("Error en registro:", err);
    }
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      title="Registro de Usuario"
      buttonText="Registrarse"
    >
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
          minLength="6"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">¿Eres estudiante o profesor?</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        >
          <option value="">Selecciona tu rol</option>
          <option value="estudiante">Estudiante</option>
          <option value="profesor">Profesor</option>
        </select>
      </div>

      {/* Mostrar formularios diferentes basados en el rol */}
      {role === 'estudiante' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Curso</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Escribe tu curso"
            required
          />
        </div>
      )}

      {role === 'profesor' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Asignatura</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Escribe la asignatura que enseñas"
            required
          />
        </div>
      )}
    </AuthForm>
  );
};

export default Register;
