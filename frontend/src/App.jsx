import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';  // Asegúrate de importar el Dashboard
import Login from './pages/Login';
import DashboardTeacher from './pages/DashboardTeacher';
import Registerform from './pages/RegisterForm'
import ResetPassword from './components/ResetPassword';
import AttendanceForm from "./pages/AttendanceForm"; 
import QRCodeGenerator from './components/QRCodeGenerator';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Agrega la ruta del dashboard */}
        <Route path="/dashboard-teacher" element={<DashboardTeacher />} /> {/* Agrega la ruta del dashboard */}
        <Route path="/RegisterForm" element={<Registerform />} /> 
        <Route path="/Login" element={<Login />} /> 
        <Route path="/attendance-form/:courseId" element={<AttendanceForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register-attendance" element={<QRCodeGenerator />} />  
      </Routes>
    </Router>
  );
}
