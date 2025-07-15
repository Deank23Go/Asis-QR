import React from 'react';

const CoursesButton = ({ onClick }) => {
  return (
    <div className="absolute left-100 w-[200px] h-[120px] bg-white-100 p-6 rounded-lg shadow-md flex items-center justify-center text-center">
      <button
        onClick={onClick} // Manejador para mostrar los cursos o el formulario de registro
        className="w-[180px] h-[60px] bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600"
      >
        Ver Cursos
      </button>
    </div>
  );
};

export default CoursesButton;
