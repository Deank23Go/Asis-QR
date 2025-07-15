import React, { useState, useEffect } from 'react';

const StudentInfoForm = ({ setNivel, setFacultad, setCarrera }) => {
  const [nivel, setLocalNivel] = useState('');
  const [facultad, setLocalFacultad] = useState('');
  const [carrera, setLocalCarrera] = useState('');
  const [facultades, setFacultades] = useState([]);
  const [carreras, setCarreras] = useState([]);

  const programas = {
    pregrado: {
      "Ingenierías": ["Ingeniería de Sistemas", "Ingeniería Electrónica", "Ingeniería Industrial"],
      "Administración y Contaduría": ["Administración de Empresas", "Contaduría Pública"],
      "Ciencias Sociales y Humanas": ["Trabajo Social", "Comunicación Social"],
      "Diseño": ["Diseño Visual"]
    },
    tecnologico: {
      "Tecnologías": ["Tecnología en Electrónica Industrial", "Tecnología en Sistemas de Información"]
    },
    tecnico: {
      "Técnicos Laborales": ["Técnico Laboral en Electricidad Industrial", "Técnico Laboral en Mecánica"]
    }
  };

  // Cambia las facultades disponibles cuando se selecciona un nivel educativo
  useEffect(() => {
    if (nivel) {
      setFacultades(Object.keys(programas[nivel]));
      setCarreras([]);  // Reseteamos las carreras cuando se cambia el nivel
      setLocalFacultad(''); // Reseteamos la facultad seleccionada
    } else {
      setFacultades([]);
      setCarreras([]);
    }
  }, [nivel]);

  // Cambia las carreras disponibles cuando se selecciona una facultad
  useEffect(() => {
    if (facultad) {
      setCarreras(programas[nivel][facultad] || []);
      setLocalCarrera('');
    } else {
      setCarreras([]);
    }
  }, [facultad, nivel]);

  const handleNivelChange = (e) => {
    const selectedNivel = e.target.value;
    setLocalNivel(selectedNivel);
    setNivel(selectedNivel);
  };

  const handleFacultadChange = (e) => {
    const selectedFacultad = e.target.value;
    setLocalFacultad(selectedFacultad);
    setFacultad(selectedFacultad);
  };

  const handleCarreraChange = (e) => {
    const selectedCarrera = e.target.value;
    setLocalCarrera(selectedCarrera);
    setCarrera(selectedCarrera);
  };

  return (
    <div className="space-y-6">
      {/* Nivel Educativo, Facultad y Carrera alineados en fila */}
      <div className="flex flex-wrap gap-6">
        {/* Nivel Educativo */}
        <div className="flex-1">
          <label htmlFor="nivel" className="block text-sm font-medium text-[#114187]">Nivel Educación</label>
          <select 
            id="nivel" 
            onChange={handleNivelChange} 
            value={nivel}
            className="mt-1 block w-full px-3 py-2 border border-[#114288] rounded-lg shadow-sm focus:outline-none focus:ring-[#124288] focus:border-[#124288] sm:text-sm" 
            required
          >
            <option value="">Selecciona el nivel educativo</option>
            <option value="pregrado">Pregrado</option>
            <option value="tecnologico">Tecnológico</option>
            <option value="tecnico">Técnico</option>
          </select>
        </div>

        {/* Facultad: solo se muestra si se seleccionó un nivel */}
        {nivel && (
          <div className="flex-1">
            <label htmlFor="facultad" className="block text-sm font-medium text-[#114187]">Facultad</label>
            <select 
              id="facultad" 
              value={facultad} 
              onChange={handleFacultadChange} 
              className="mt-1 block w-full px-3 py-2 border border-[#114288] rounded-lg shadow-sm focus:outline-none focus:ring-[#124288] focus:border-[#124288] sm:text-sm" 
              required
            >
              <option value="">Selecciona la facultad</option>
              {facultades.map((fac) => (
                <option key={fac} value={fac}>
                  {fac}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Carrera: solo se muestra si se seleccionó una facultad */}
        {facultad && (
          <div className="flex-1">
            <label htmlFor="carrera" className="block text-sm font-medium text-[#114187]">Carrera</label>
            <select 
              id="carrera" 
              value={carrera}
              onChange={handleCarreraChange} 
              className="mt-1 block w-full px-3 py-2 border border-[#114288] rounded-lg shadow-sm focus:outline-none focus:ring-[#124288] focus:border-[#124288] sm:text-sm" 
              required
            >
              <option value="">Selecciona la carrera</option>
              {carreras.map((car) => (
                <option key={car} value={car}>
                  {car}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentInfoForm;
