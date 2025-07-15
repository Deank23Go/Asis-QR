import React, { useState, useEffect } from "react";
import QRCodeGenerator from "./QRCodeGenerator"; // Componente para generar el QR
import axios from "../utils/axios";

const Attendance = () => {
  const [courses, setCourses] = useState([]); // Lista de cursos disponibles
  const [selectedCourse, setSelectedCourse] = useState(null); // Curso seleccionado
  const [showQR, setShowQR] = useState(false); // Mostrar el QR después de seleccionar un curso

  // Función para obtener los cursos registrados por el profesor
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/courses");
        setCourses(response.data); // Guardar los cursos en el estado
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };

    fetchCourses(); // Obtener los cursos al cargar el componente
  }, []);

  // Función para manejar la selección de un curso
  const handleSelectCourse = (courseId) => {
    setSelectedCourse(courseId); // Establecer el curso seleccionado
    setShowQR(true); // Hacer visible el botón para generar el QR
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tomar Asistencia</h2>

      {/* Lista de cursos disponibles */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Selecciona un curso</h3>
        <div className="space-y-2">
          {courses.length > 0 ? (
            courses.map((course) => (
              <button
                key={course.id}
                onClick={() => handleSelectCourse(course.id)} // Seleccionar curso
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {course.name}
              </button>
            ))
          ) : (
            <p>No tienes cursos registrados.</p>
          )}
        </div>
      </div>

      {/* Mostrar botón de generar QR si se selecciona un curso */}
      {showQR && selectedCourse && (
        <div className="mt-4">
          <QRCodeGenerator courseId={selectedCourse} /> {/* Generar QR para el curso */}
        </div>
      )}
    </div>
  );
};

export default Attendance;
