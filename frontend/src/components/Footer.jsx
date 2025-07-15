export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Sistema de Asistencia - Todos los derechos reservados</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="hover:text-blue-300">Políticas de Privacidad</a>
            <a href="#" className="hover:text-blue-300">Términos de Servicio</a>
          </div>
        </div>
      </footer>
    );
  }