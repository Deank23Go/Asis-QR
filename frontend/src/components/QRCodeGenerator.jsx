import React from "react";
import QRCode from "react-qr-code";

const QRCodeGenerator = ({ courseId }) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-4">Generar QR para el Curso</h3>
      <QRCode value={`http://localhost:3000/attendance-form/${courseId}`} />
    </div>
  );
};

export default QRCodeGenerator;
