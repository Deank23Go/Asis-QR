import React, { useState, useEffect } from 'react';
import axios from '../utils/axios'; // Tu configuración de Axios

const RegisterCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseSchedule, setCourseSchedule] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [courses, setCourses] = useState([]);


  // Cargar los cursos registrados por el profesor
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/courses');  // Asegúrate de que esta URL sea correcta
      setCourses(response.data);  // Establece los cursos en el estado
    } catch (error) {
      console.error('Error al obtener los cursos:', error);
    }
  };
  
  useEffect(() => {
    fetchCourses(); // Llamar para cargar los cursos al cargar el componente
  }, []);

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Recupera la información del curso
      const response = await axios.post('http://localhost:3000/api/register-course', {
        courseName,
        courseDescription,
        courseSchedule,
      });
  
      setSuccessMessage('Curso registrado exitosamente');
      setCourseName('');
      setCourseDescription('');
      setCourseSchedule('');
    } catch (error) {
      setErrorMessage('Error al registrar el curso: ' + error.message);
      console.error('Error al registrar el curso:', error);
    }
  };
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Registrar Nuevo Curso</h2>

      {/* Formulario para registrar curso */}
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

        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}

        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Registrar Curso
        </button>
      </form>

      {/* Mostrar los cursos registrados */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Cursos Registrados</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Nombre del Curso</th>
              <th className="py-2 px-4 text-left">Descripción</th>
              <th className="py-2 px-4 text-left">Horario</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4">No hay cursos registrados.</td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id}>
                  <td className="py-2 px-4">{course.name}</td>
                  <td className="py-2 px-4">{course.description}</td>
                  <td className="py-2 px-4">{course.schedule}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisterCourse;
