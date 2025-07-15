import React, { useState, useEffect } from "react";
import axios from "../utils/axios"; // Asegúrate de que axios esté configurado correctamente

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseSchedule, setCourseSchedule] = useState("");

  // Obtener los cursos registrados por el docente
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleRegisterCourseClick = () => {
    setShowRegisterForm(true);
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();

    try {
      const teacherId = 1; // Obtén el ID del docente de la sesión
      await axios.post("http://localhost:3000/api/register-course", {
        courseName,
        courseDescription,
        courseSchedule,
        teacherId,
      });
      setShowRegisterForm(false);
      setCourseName("");
      setCourseDescription("");
      setCourseSchedule("");

      const response = await axios.get("http://localhost:3000/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error al registrar el curso:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Mis Cursos</h2>

      {/* Mostrar los cursos registrados */}
      <div className="mb-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cursos Registrados</h3>
        <ul className="space-y-4 mt-4">
          {courses.map((course) => (
            <li key={course.id} className="border-b border-gray-300 pb-4">
              <div className="text-lg font-semibold text-gray-800">{course.name}</div>
              <p className="text-gray-600">{course.description}</p>
              <p className="text-gray-500">
                <strong>Horario:</strong> {course.schedule}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Botón para registrar un nuevo curso */}
      {!showRegisterForm && (
        <button
          onClick={handleRegisterCourseClick}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Registrar Nuevo Curso
        </button>
      )}

      {/* Formulario de registro de curso */}
      {showRegisterForm && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Registrar Nuevo Curso</h3>
          <form onSubmit={handleCourseSubmit}>
            <div className="mb-4">
              <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Nombre del Curso</label>
              <input
                type="text"
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">Descripción del Curso</label>
              <textarea
                id="courseDescription"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="courseSchedule" className="block text-sm font-medium text-gray-700">Horario</label>
              <input
                type="text"
                id="courseSchedule"
                value={courseSchedule}
                onChange={(e) => setCourseSchedule(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
            >
              Registrar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Courses;
