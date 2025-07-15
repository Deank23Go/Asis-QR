import React from 'react';

const PersonalInfoModal = ({ studentName, email, phone,  role, nivel, facultad, carrera, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 justify-center text-center">Información Personal</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {/* Imagen del estudiante */}
            
            <p className="font-semibold text-lg"><strong>Nombre:</strong>{studentName}</p>
          </div>

          <div>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Teléfono:</strong> {phone}</p>
            <p><strong>Rol:</strong> {role}</p>
            <p><strong>Nivel Educativo:</strong> {nivel}</p> {/* Nivel educativo */}
            <p><strong>Facultad:</strong> {facultad}</p>
            <p><strong>Carrera:</strong> {carrera}</p>
          </div>
        </div>
        <button
          onClick={closeModal}
          className="mt-4 w-full py-2 text-xs bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoModal;
