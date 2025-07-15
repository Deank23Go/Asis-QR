import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Asegúrate de importar useParams de react-router-dom
import axios from '../utils/axios';  // Configuración de Axios

const AttendanceForm = () => {
  const { courseId } = useParams();  // Obtener courseId de la URL
  const [studentName, setStudentName] = useState('');
  const [attendance, setAttendance] = useState(true);  // Asumimos que por defecto estará presente
  const [message, setMessage] = useState('');

  const handleAttendance = async (e) => {
    e.preventDefault();

    try {
      // Hacemos la solicitud POST para registrar la asistencia
      const response = await axios.post('http://localhost:3000/api/register-attendance', {
        studentName,
        courseId,
        attendance,
      });

      // Asegúrate de que la respuesta contiene un mensaje
      if (response.data && response.data.message) {
        setMessage(response.data.message);  // Actualiza el mensaje con la respuesta del servidor
      } else {
        setMessage('Asistencia registrada con éxito');
      }
    } catch (error) {
      // En caso de error, mostramos un mensaje de error
      setMessage('Hubo un error al registrar la asistencia');
      console.error('Error al registrar la asistencia:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-[#114187] mb-8">Formulario de Asistencia para el Curso {courseId}</h2>

        <form onSubmit={handleAttendance}>
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Nombre del Estudiante</label>
            <input
              type="text"
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Ingresa tu nombre"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#114187] focus:border-[#114187]"
              required
            />
          </div>

          <div className="mt-4">
            <label className="mr-4">
              <input
                type="radio"
                name="attendance"
                value="true"
                checked={attendance === true}
                onChange={() => setAttendance(true)}
              />
              Presente
            </label>
            <label>
              <input
                type="radio"
                name="attendance"
                value="false"
                checked={attendance === false}
                onChange={() => setAttendance(false)}
              />
              Ausente
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-2 bg-[#114187] text-white rounded-md hover:bg-[#0e3681] focus:outline-none"
          >
            Registrar Asistencia
          </button>
        </form>

        {/* Mostrar el mensaje de éxito o error */}
        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default AttendanceForm;
