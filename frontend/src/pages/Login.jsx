import React, { useState } from 'react';
import axios from '../utils/axios';  // Tu configuración de Axios
import { useNavigate } from 'react-router-dom'; // Usamos useNavigate en lugar de useHistory

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Usamos useNavigate en lugar de useHistory

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });

      // Verificar que la respuesta contenga la información del usuario
      if (response.data.user) {
        console.log('Usuario autenticado:', response.data.user);
        // Guardamos la información del usuario en localStorage (si es necesario)
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Verificamos si el rol existe en la respuesta
        const userRole = response.data.user.role;
        console.log('Rol del usuario:', userRole);

        if (userRole === 'estudiante') {
          navigate('/dashboard'); // Redirigir al Dashboard del estudiante
          console.log('Entrio como estudiante:', userRole);
        } else if (userRole === 'profesor') {
          navigate('/dashboard-teacher'); // Redirigir al Dashboard del profesor
        } else {
          console.log('Rol no reconocido');
          setErrorMessage('Rol no reconocido, acceso denegado');
        }
      } else {
        setErrorMessage('No se recibió la información del usuario');
      }

    } catch (error) {
      setErrorMessage('Error al iniciar sesión: ' + error.message);
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-[#114187] mb-8">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#114187] focus:border-[#114187]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#114187] focus:border-[#114187]"
              required
            />
          </div>

          {/* Mensaje de error */}
          {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}

          <button
            type="submit"
            className="px-6 py-2 bg-[#114187] text-white rounded-md hover:bg-[#0e3681] focus:outline-none"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
