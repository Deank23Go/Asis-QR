import React, { useState, useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/outline"; // Importamos el ícono de cerrar sesión desde Heroicons
import axios from "../utils/axios"; // Tu configuración de Axios
import ScanQRCode from "../components/ScanQRCode"; // Importa ScanQRCode
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import PersonalInfoModal from "../components/PersonalInfoStud";

const DashboardStudent = () => {
  const [studentName, setStudentName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showQRCodeScanner, setShowQRCodeScanner] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [facultad, setFacultad] = useState("");
  const [carrera, setCarrera] = useState("");
  const [nivel, setNivel] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const imagePath = response.data.imagen
          ? `${import.meta.env.VITE_BACKEND_URL}/${response.data.imagen}`
          : `${import.meta.env.VITE_BACKEND_URL}/uploads/user.png`;

        // Asignamos los valores de los datos obtenidos del backend
        setStudentName(response.data.nombre || "Estudiante");
        setProfileImage(imagePath);
        setEmail(response.data.email);
        setPhone(response.data.telefono);
        setNivel(response.data.nivel);
        setRole(response.data.role);
        setFacultad(response.data.facultad);
        setCarrera(response.data.carrera);
      } catch (error) {
        console.error("Error al obtener los datos del estudiante:", error);
      }
    };

    fetchUserData();
  }, []);

  const closeModal = () => setShowModal(false);

  const handleScanQRCodeClick = () => {
    setShowQRCodeScanner(true);
  };

  // Función para cerrar sesión
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-[#2D4F77] text-white p-2 flex justify-center items-center">
        <div className="flex justify-center items-center w-full">
          <img
            src="http://localhost:3000/uploads/logo.png"
            alt="Logo"
            className="rounded-[20px] max-w-[150px] sm:max-w-[900px] max-w-full h-auto object-contain transition-all duration-300 ease-in-out "
          />
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 p-6 flex justify-center items-center bg-gray-300">
        <div className="w-full sm:w-3/4 lg:w-2/4 bg-gray-200 p-6 rounded-xl shadow-md flex flex-col sm:flex-row space-x-6">
          {/* Información del Estudiante */}
          <div className="w-full sm:w-1/3 lg:w-1/4 bg-[#2D4F77] text-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center mb-6 sm:mb-0">
            <img
              src={profileImage || "http://localhost:3000/uploads/user.png"}
              alt="Perfil"
              className="w-32 h-32 rounded-full border-4 border-[#E1E8ED] mb-4"
            />
            <p className="font-semibold  sm:text-2xl">{studentName}</p>
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-2 bg-[#2D4F77] text-red rounded-md hover:bg-[#5C81A6] pixel-art-btn sm:text-lg text-base text-center transition-transform transform hover:hover:animate-bounceUpDown flex items-center justify-center rounded-xl"
            >
              Información
            </button>
          </div>

          {/* Opciones de Escanear QR y Toma de Asistencia */}
          <div className="w-full sm:w-2/2 lg:w-2/4 pace-y-4 relative">
            {" "}
            {/* Agregar "relative" al contenedor */}
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Opción Escanear QR */}
              <div className="w-72 h-30 bg-gray-300 p-4 rounded-xl shadow-md hover:bg-blue-200 cursor-pointer">
                <button
                  onClick={handleScanQRCodeClick}
                  className="w-full h-full py-2 bg-[#2D4F77] text-white rounded-md hover:bg-[#5C81A6] pixel-art-btn transition-transform transform hover:animate-bounceUpDown flex items-center justify-center rounded-xl"
                >
                  Escanear QR
                </button>
              </div>

              {/* Opción Toma de Asistencia */}
              <div className="w-72 h-30 bg-gray-300 p-4 rounded-xl shadow-md hover:bg-blue-200 cursor-pointer">
                <button
                  onClick={() => {}}
                  className="w-full h-full py-2 bg-[#2D4F77] text-white rounded-md hover:bg-[#5C81A6] pixel-art-btn transition-transform transform hover:animate-bounceUpDown flex items-center justify-center rounded-xl"
                >
                  Historial de Asistencia
                </button>
              </div>
            </div>
            {/* Botón de Cerrar Sesión en la esquina superior derecha */}
            <div className="absolute top-2 right-2 sm:right-4 md:right-2 xl-large:right-8">
              <button
                onClick={handleLogout}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mostrar el escáner QR si está activado */}
      {showQRCodeScanner && <ScanQRCode />}

      {/* Mostrar el modal solo si showModal es true */}
      {showModal && (
        <PersonalInfoModal
          studentName={studentName}
          email={email}
          phone={phone}
          role={role}
          nivel={nivel}
          facultad={facultad}
          carrera={carrera}
          closeModal={closeModal}
        />
      )}
      <Footer />
    </div>
  );
};

export default DashboardStudent;
