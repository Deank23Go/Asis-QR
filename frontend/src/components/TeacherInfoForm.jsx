import React from 'react';

const TeacherInfoForm = ({ setFacultad, setCarrera }) => {
  return (
    <div className="teacher-info-form p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Información Docente</h2>

      <div className="input-group mb-4">
        <label htmlFor="facultad" className="block text-sm font-medium text-gray-700">Facultad</label>
        <input 
          type="text" 
          id="facultad" 
          placeholder="Ingresa tu facultad"
          onChange={(e) => setFacultad(e.target.value)} 
          required 
          className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="input-group mb-4">
        <label htmlFor="carrera" className="block text-sm font-medium text-gray-700">Carrera</label>
        <input 
          type="text" 
          id="carrera" 
          placeholder="Ingresa tu carrera"
          onChange={(e) => setCarrera(e.target.value)} 
          required 
          className="mt-2 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Puedes agregar un botón o mensaje adicional si es necesario */}
      <button
        type="submit"
        className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Guardar Información
      </button>
    </div>
  );
};

export default TeacherInfoForm;
