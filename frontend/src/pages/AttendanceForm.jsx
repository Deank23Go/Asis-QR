import React, { useState } from 'react';
import { useParams } from 'react-router-dom';  // Para obtener el courseId de la URL
import axios from '../utils/axios';

const AttendanceForm = () => {
  const { courseId } = useParams(); // Obtenemos el courseId de la URL
  const [studentName, setStudentName] = useState('');
  const [attendance, setAttendance] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar solicitud POST al backend para registrar la asistencia
      const response = await axios.post(`http://localhost:3000/api/register-attendance/${courseId}`, {
        studentName,
        attendance,
      });

      if (response.data.success) {
        alert('Asistencia registrada con éxito');
      } else {
        setErrorMessage('Error al registrar la asistencia');
      }
    } catch (error) {
      console.error('Error al registrar la asistencia:', error);
      setErrorMessage('Error al registrar la asistencia');
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Formulario de Asistencia para el Curso {courseId}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Nombre del Estudiante</label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="attendance" className="block text-sm font-medium text-gray-700">Asistencia</label>
          <input
            type="checkbox"
            id="attendance"
            checked={attendance}
            onChange={(e) => setAttendance(e.target.checked)}
            className="mt-1"
          />
          <span className="ml-2">Marcar si asistió</span>
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Registrar Asistencia
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
