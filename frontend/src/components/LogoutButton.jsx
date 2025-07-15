import React from 'react';

const LogoutButton = ({ onClick }) => {
  return (
    <div className="absolute top-25 right-1">
      <button
        onClick={onClick} // Función para manejar el cierre de sesión
        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default LogoutButton;
