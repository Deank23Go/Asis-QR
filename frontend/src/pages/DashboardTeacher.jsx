import React, { useState, useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/outline";
import axios from "../utils/axios"; // Tu configuración de Axios
import PersonalInfo from "../components/PersonalInfo"; // Componente PersonalInfo
import RegisterCourse from "../components/RegisterCourse"; // Componente de registro de cursos
import TakeAttendance from "../components/TakeAttendance"; // Componente de toma de asistencia
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const DashboardTeacher = () => {
  const [teacherName, setTeacherName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [ShowCourses, setShowCourses] = useState(true);
  const [showAttendance, setShowAttendance] = useState(false);
  const [teacherId, setTeacherId] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [facultad, setFacultad] = useState("");
  const [carrera, setCarrera] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user");
        const imagePath = response.data.imagen
          ? `http://localhost:3000/${response.data.imagen}`
          : "http://localhost:3000/uploads/user.png";
        setTeacherName(response.data.nombre || "Profesor/a");
        setProfileImage(imagePath);
        setEmail(response.data.email);
        setPhone(response.data.telefono);
        setRole(response.data.role);
        setFacultad(response.data.facultad);
        setCarrera(response.data.carrera);
      } catch (error) {
        console.error("Error al obtener los datos del docente:", error);
      }
    };
    fetchTeacherData(); // Llamada para obtener los datos
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout"); // Solicitud al backend para cerrar sesión
      localStorage.removeItem("user"); // Elimina el usuario de localStorage

      // Redirigir al login después de cerrar sesión
      navigate("/login"); // Redirige a la página de login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleRegisterCourseClick = () => {
    setShowRegisterForm(true);
    setShowCourses(false);
    setShowAttendance(false);
  };

  const handleTakeAttendanceClick = () => {
    setShowAttendance(true);
    setShowCourses(false);
    setShowRegisterForm(false);
  };

  const handleBack = () => {
    setShowRegisterForm(false);
    setShowCourses(true);
    setShowAttendance(false);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col relative">
      {/* Header */}
      <header className="bg-[#2D4F77] text-white p-6 flex justify-between items-center">
        <div className="text-xl font-semibold flex justify-center items-center w-full">
          <img
            src="http://localhost:3000/uploads/logo.png"
            alt="Logo"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 p-6 flex justify-center items-center bg-[#FFFFFF]">
        <div className="w-full sm:w-3/4 lg:w-2/3 bg-gray-200 p-6 rounded-lg shadow-md flex flex-col sm:flex-row space-x-6">
          {/* Información del Docente */}
          <div className="w-full sm:w-1/3 lg:w-1/4 bg-[#2D4F77] text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center mb-6 sm:mb-0">
            <img
              src={
                profileImage ||
                "http://localhost:3000/uploads/user.png"
              }
              alt="Perfil"
              className="w-32 h-32 rounded-full border-4 border-[#E1E8ED] mb-4"
            />
            <p className="font-semibold  sm:text-2xl">{teacherName}</p>
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-2 bg-[#2D4F77] text-red rounded-md hover:bg-[#5C81A6] pixel-art-btn sm:text-lg text-base text-center transition-transform transform hover:hover:animate-bounceUpDown flex items-center justify-center"
            >
              Información
            </button>
          </div>

          {/* Opciones de Cursos */}
          <div className="w-full sm:w-2/3 lg:w-2/4 space-y-4 relative">
            {/* Ver Cursos */}
            {ShowCourses && !showRegisterForm && !showAttendance && (
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="w-72 h-30 bg-gray-400 p-4 rounded-lg shadow-md hover:bg-blue-100 cursor-pointer">
                  <button
                    onClick={handleRegisterCourseClick}
                    className="w-full h-full py-2 bg-[#2D4F77] text-white rounded-md hover:bg-[#5C81A6] pixel-art-btn transition-transform transform hover:animate-bounceUpDown flex items-center justify-center"
                  >
                    Ver Cursos
                  </button>
                </div>
                {/* Toma de Asistencia */}
                <div className="w-72 h-30 bg-gray-400 p-4 rounded-lg shadow-md hover:bg-blue-100 cursor-pointer">
                  <button
                    onClick={handleTakeAttendanceClick}
                    className="w-full h-full py-2 bg-[#2D4F77] text-white rounded-md hover:bg-[#5C81A6] pixel-art-btn transition-transform transform hover:animate-bounceUpDown flex items-center justify-center"
                  >
                    Toma de Asistencia
                  </button>
                </div>
              </div>
            )}

            {/* Botón de Cerrar Sesión */}
            <div className="absolute top-4 right-4">
              <button
                onClick={handleLogout}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Mostrar el formulario de registro de cursos */}
            {showRegisterForm && !ShowCourses && !showAttendance && (
              <div>
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mb-4 pixel-art-btn"
                >
                  Dashboard
                </button>
                <RegisterCourse />
              </div>
            )}

            {/* Mostrar la toma de asistencia */}
            {showAttendance && !showRegisterForm && !ShowCourses && (
              <div>
                <button
                  onClick={handleBack}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mb-4 pixel-art-btn"
                >
                  Dashboard
                </button>
                <TakeAttendance teacherId={teacherId} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mostrar el modal solo si showModal es true */}
      {showModal && (
        <PersonalInfo
        teacherName={teacherName}
          email={email}
          phone={phone}
          role={role}
          facultad={facultad}
          carrera={carrera}
          closeModal={() => setShowModal(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default DashboardTeacher;
