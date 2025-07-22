export default function Header() {
    return (
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-0.1 py-0.1 flex justify-between items-center">
         
            <img 
              src="public/Logo.png"  // Ajusta la ruta
              alt="Logo" 
              className="w-full h-25"
            />
             
        </div>
      </header>
    );
  }