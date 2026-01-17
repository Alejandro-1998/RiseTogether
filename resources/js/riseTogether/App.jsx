import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages/public/HomePage";
import LoginInicioPage from "./pages/public/LoginInicioPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RegistroPage from "./pages/public/RegistroPage";
import CrearProyectoPage from "./pages/public/CrearProyectoPage";
import ProyectosPage from "./pages/public/ProyectosPage";
import UsuarioPage from "./pages/public/UsuarioPage";
import ProyectoPage from "./pages/public/ProyectoPage";

// RUTAS //
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Login */}
          <Route path="/login" element={<LoginInicioPage />} />

          {/* Registro */}
          <Route path="/registro" element={<RegistroPage />} />

          {/* Admin */}
          <Route path="/administrador" element={<AdminDashboard />} />

          {/* Crear Proyecto */}
          <Route path="/crear-proyecto" element={<CrearProyectoPage />} />

          {/* Descubrir Proyectos */}
          <Route path="/proyectos" element={<ProyectosPage />} />

          {/* Usuario */}
          <Route path="/usuario" element={<UsuarioPage />} />
          
          {/* Proyecto */}
          <Route path="/proyecto" element={<ProyectoPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;