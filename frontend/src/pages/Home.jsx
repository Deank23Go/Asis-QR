import { useNavigate } from "react-router-dom"; // Importamos el hook de React Router
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate(); // Usamos el hook para navegación

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirige a la página de login
  };

  const handleRegisterRedirect = () => {
    navigate("/Registerform"); // Redirige a la página de registro
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F4F8]"> {/* Fondo con gris claro */}
      <Header />
      
      {/* Contenido principal */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D4F77] mb-6"> {/* Azul oscuro */}
            Sistema de Registro de Asistencia
          </h1>
          <p className="text-xl text-[#4F5D73] mb-8 max-w-2xl mx-auto"> {/* Gris oscuro */}
            "Bienvenido a la plataforma de gestión de asistencia de la UNIAJC!"
          </p>
          
          {/* Botones de acción */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleLoginRedirect}
              className="bg-[#2D4F77] hover:bg-[#5C81A6] text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={handleRegisterRedirect}
              className="bg-white hover:bg-[#E1E8ED] text-[#2D4F77] border border-[#2D4F77] px-6 py-3 rounded-lg font-medium transition"
            >
              Registrarse
            </button>
          </div>
        </section>

        {/* Sección adicional (opcional) */}
        <section className="mt-20 grid md:grid-cols-3 gap-8">
          {[{ title: "Registro Rápido", desc: "Registra asistencia con un solo clic." },
            { title: "Reportes", desc: "Genera informes automáticos." },
            { title: "Seguridad", desc: "Datos protegidos con encriptación." }].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-[#2D4F77] mb-2"> {/* Azul oscuro */}
                {item.title}
              </h3>
              <p className="text-[#4F5D73]">{item.desc}</p> {/* Gris oscuro */}
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
