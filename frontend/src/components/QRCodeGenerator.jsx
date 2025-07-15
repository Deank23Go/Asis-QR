import React, { useRef } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas"; // Importa html2canvas

const QRCodeGenerator = ({ courseId }) => {
  const qrRef = useRef(); // Crear una referencia para el QR

  const handleDownloadQR = () => {
    // Usamos html2canvas para convertir el QR en una imagen
    html2canvas(qrRef.current).then((canvas) => {
      const imgURL = canvas.toDataURL("image/png"); // Convertimos a imagen PNG
      const a = document.createElement("a"); // Creamos un enlace de descarga
      a.href = imgURL; // Asignamos la URL de la imagen
      a.download = `QR_Curso_${courseId}.png`; // Nombre del archivo para descargar
      a.click(); // Simulamos un clic para iniciar la descarga
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-4">Generar QR para el Curso</h3>

      {/* Creamos un div con referencia para capturar la imagen del QR */}
      <div ref={qrRef} className="mb-4">
        <QRCode value={`http://localhost:3000/attendance-form/${courseId}`} />
      </div>

      {/* Botón para descargar el QR */}
      <button
        onClick={handleDownloadQR}
        className="px-6 py-2 bg-[#114187] text-white rounded-md hover:bg-[#0e3681]"
      >
        Descargar Código QR
      </button>
    </div>
  );
};

export default QRCodeGenerator;
