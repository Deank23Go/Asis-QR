import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'  // Plugin de React para Vite
import tailwindcss from '@tailwindcss/vite'  // Plugin para Tailwind CSS
import path from 'path'  // Para trabajar con rutas absolutas

// Configuración de Vite
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],  // Añadir los plugins para React y Tailwind CSS
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, 'src'),  // Alias '@' apunta a la carpeta 'src'
    },
  },
  server: {
    // Configuración opcional del servidor de desarrollo
    open: true,  // Abre el navegador automáticamente
  },
  build: {
    outDir: 'dist',  // Configura la carpeta de salida para los archivos de la compilación
  }
})
