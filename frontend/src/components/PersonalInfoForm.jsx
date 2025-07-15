import React from 'react';

const PersonalInfoForm = ({ setNombre, setEmail, setTelefono, setPassword }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="input-group flex items-center border-b border-blue-500 py-2">
       
        <input 
          type="text" 
          id="nombre" 
          placeholder="Ingresa tu nombre completo" 
          onChange={(e) => setNombre(e.target.value)} 
          className="peer h-10 w-full border-b-0 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
          required
        />
      </div>

      <div className="input-group flex items-center border-b border-blue-500 py-2">
        
        <input 
          type="email" 
          id="email" 
          placeholder="Correo Electrónico" 
          onChange={(e) => setEmail(e.target.value)} 
          className="peer h-10 w-full border-b-0 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
          required
        />
      </div>

      <div className="input-group flex items-center border-b border-blue-500 py-2">
        
        <input 
          type="tel" 
          id="telefono" 
          placeholder="Ingresa tu teléfono" 
          onChange={(e) => setTelefono(e.target.value)} 
          className="peer h-10 w-full border-b-0 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
          required
        />
      </div>

      {/* Campo de Contraseña */}
      <div className="input-group flex items-center border-b border-blue-500 py-2">
        
        <input 
          type="password" 
          id="password" 
          placeholder="Ingresa tu contraseña" 
          onChange={(e) => setPassword(e.target.value)} 
          className="peer h-10 w-full border-b-0 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
          required
        />
      </div>
    </div>
  );
};


export default PersonalInfoForm;
