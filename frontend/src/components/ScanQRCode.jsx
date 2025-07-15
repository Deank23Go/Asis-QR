import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from '../utils/axios'; // Tu configuración de Axios

const ScanQRCode = () => {
  const [scannedCode, setScannedCode] = useState(""); // Guardar el código QR escaneado
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error
  const [showSuccess, setShowSuccess] = useState(false); // Mostrar mensaje de éxito

  // Función para manejar el escaneo
  const handleScanSuccess = (qrCodeMessage) => {
    setScannedCode(qrCodeMessage); // Guardar el código escaneado
    setShowSuccess(true); // Mostrar mensaje de éxito
    setLoading(false); // Deshabilitar el estado de carga
  };

  // Función para manejar el error
  const handleScanError = (errorMessage) => {
    setErrorMessage(errorMessage); // Mostrar error
    setLoading(false); // Deshabilitar el estado de carga
  };

  // Inicialización del escáner cuando el componente se monta
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      handleScanSuccess, // Función que se ejecuta cuando el código es escaneado
      handleScanError // Función que maneja los errores durante el escaneo
    );

    // Cleanup on component unmount
    return () => scanner.clear();
  }, []);

  const handleRetryScan = () => {
    setErrorMessage(""); // Limpiar el mensaje de error
    setShowSuccess(false); // Limpiar el mensaje de éxito
    setLoading(true); // Volver a activar el estado de carga
  };

  return (
    <div className="scan-container">
      <div id="reader" style={{ width: '100%', height: '100%' }}></div>

      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="scan-result bg-green-100 p-4 rounded-lg shadow-md w-full max-w-xs mx-auto mt-4">
          <h3 className="text-green-500 text-lg font-semibold mb-4">¡Escaneo Exitoso!</h3>
          <p className="text-center">{scannedCode}</p>
        </div>
      )}

      {/* Mensaje de error */}
      {errorMessage && (
        <div className="scan-result bg-red-100 p-4 rounded-lg shadow-md w-full max-w-xs mx-auto mt-4">
          <h3 className="text-red-500 text-lg font-semibold mb-4">Error al escanear</h3>
          <p className="text-center">{errorMessage}</p>
          <button
            onClick={handleRetryScan}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Spinner de carga */}
      {loading && (
        <div className="w-full flex justify-center items-center py-10">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-blue-500" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanQRCode;
