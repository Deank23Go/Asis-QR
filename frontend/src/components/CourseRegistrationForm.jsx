import React, { useState } from 'react';
import axios from '../utils/axios'; // Tu configuración de Axios

const CourseRegistrationForm = ({ onBack }) => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseSchedule, setCourseSchedule] = useState('');
  const [message, setMessage] = useState('');

  const handleCourseSubmit = async (e) => {
    e.preventDefault();

    try {
      const teacherId = 1; // Suponiendo que el docente está logueado y tiene este ID
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register-course`, {
        courseName,
        courseDescription,
        courseSchedule,
        teacherId,
      });

      setMessage(response.data.message); // Mostrar mensaje de éxito
      setCourseName('');
      setCourseDescription('');
      setCourseSchedule('');
    } catch (error) {
      setMessage('Error al registrar el curso: ' + error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Registrar Nuevo Curso</h2>

      <form onSubmit={handleCourseSubmit} className="space-y-4">
        <div>
          <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Nombre del Curso</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Ingresa el nombre del curso"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">Descripción del Curso</label>
          <textarea
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            placeholder="Ingresa una descripción breve del curso"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="courseSchedule" className="block text-sm font-medium text-gray-700">Horario del Curso</label>
          <input
            type="text"
            id="courseSchedule"
            value={courseSchedule}
            onChange={(e) => setCourseSchedule(e.target.value)}
            placeholder="Ingresa el horario del curso"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {message && <p className="text-green-600">{message}</p>}

        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Registrar Curso
        </button>
      </form>

      <button
        onClick={onBack} // Función para volver al Dashboard
        className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
      >
        Volver al Dashboard
      </button>
    </div>
  );
};

export default CourseRegistrationForm;
