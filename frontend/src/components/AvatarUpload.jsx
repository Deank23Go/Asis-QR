import React, { useState } from 'react';

const AvatarUpload = ({ setImagen }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImagen(file); // Almacena el archivo de imagen en el estado del formulario principal
    }
  };

  return (
    <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-md flex items-center justify-center relative">
      
      {/* El texto de la etiqueta de "Sube tu imagen de perfil" será visible solo si es necesario */}
      <label 
        htmlFor="avatar" 
        className="absolute text-sm font-medium text-gray-700 opacity-0 hover:opacity-75 transition-opacity">
        Sube tu imagen de perfil
      </label>
  
      {/* Input de imagen */}
      <input 
        type="file" 
        id="avatar" 
        accept="image/*" 
        onChange={handleImageChange} 
        className="h-full w-full object-cover opacity-0 cursor-pointer absolute top-0 left-0" 
      />
      
      {/* Imagen seleccionada */}
      {selectedImage && (
        <img src={selectedImage} alt="Avatar" className="absolute text-lg font-medium text-gray-700 opacity-75" />
      )}
    </div>
  );
  
};

export default AvatarUpload;
