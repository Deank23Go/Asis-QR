import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';  // Para redirigir al login

const ResetPassword = () => {
  const [email, setEmail] = useState('');  // Correo electrónico del usuario
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();  // Hook para redirigir a otras páginas

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Enviar el correo y la nueva contraseña al backend
      const response = await axios.post('http://localhost:3000/api/reset-password', { email, newPassword });
      setSuccessMessage(response.data.message);  // Mensaje de éxito al restablecer la contraseña

      // Redirigir al login después de 2 segundos para que el usuario vea el mensaje
      setTimeout(() => {
        navigate('/login');  // Redirigir a la página de login
      }, 2000);  // Redirigir después de 2 segundos

    } catch (error) {
      setErrorMessage('Error al restablecer la contraseña: ' + error.message);
      console.error('Error al restablecer la contraseña:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-[#114187] mb-8">Restablecer Contraseña</h2>

        {/* Formulario de restablecimiento de contraseña */}
        <form onSubmit={handleResetPassword} className="space-y-6">
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
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nueva contraseña"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#114187] focus:border-[#114187]"
              required
            />
          </div>

          {/* Botón de restablecimiento */}
          <button
            type="submit"
            className="w-full px-6 py-2 bg-[#114187] text-white rounded-md hover:bg-[#0e3681] focus:outline-none"
          >
            Restablecer Contraseña
          </button>
        </form>

        {/* Mensajes de error o éxito */}
        {errorMessage && <p className="text-red-600 text-sm mt-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-600 text-sm mt-4">{successMessage}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
