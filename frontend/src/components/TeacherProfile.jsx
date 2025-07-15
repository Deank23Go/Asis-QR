import React from 'react';

const TeacherProfile = ({ teacherName, profileImage, handleModal, email, phone, role, facultad, carrera }) => {
  return (
    <div className="w-[200px] h-[230px] bg-gray-600 p-4 rounded-lg shadow-md mr-6">
      <div className="w-[200px] h-[200px] bg-white p-2 rounded-lg shadow-md mr-6 flex flex-col items-center justify-center">
        <img
          src={profileImage || "http://localhost:3000/uploads/default-avatar.png"}
          alt="Perfil"
          className="w-[120px] h-[120px] rounded-full border-2 border-gray-300 mb-2"
        />
        <p className="font-semibold text-xs mb-2 text-center">{teacherName}</p>
        <button
          onClick={() => handleModal({ teacherName, email, phone, role, facultad, carrera })} // Llamada a la función para mostrar el modal
          className="w-full py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Información
        </button>
      </div>
    </div>
  );
};

export default TeacherProfile;
