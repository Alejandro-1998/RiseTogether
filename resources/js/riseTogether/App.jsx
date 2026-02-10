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
import AdminGestionProyectos from "./pages/admin/AdminGestionProyectos";
import AdminGestionUsuarios from "./pages/admin/AdminGestionUsuarios";
import AdminCategorias from "./pages/admin/AdminCategorias";
import AdminEventos from "./pages/admin/AdminEventos";
import AdminPagos from "./pages/admin/AdminPagos";

import SobreNosotrosPage from "./pages/public/SobreNosotrosPage";
import ContactoPage from "./pages/public/ContactoPage";
import AvisoLegalPage from "./pages/public/AvisoLegalPage";
import EventosPage from "./pages/public/EventosPage";

import RequireAdmin from "./components/RequireAdmin";

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

          {/* RUTAS PROTEGIDAS ADMIN */}
          <Route element={<RequireAdmin />}>
            <Route path="/administrador" element={<AdminDashboard />} />
            <Route path="/administrador/usuarios" element={<AdminGestionUsuarios />} />
            <Route path="/administrador/proyectos" element={<AdminGestionProyectos />} />
            <Route path="/administrador/categorias" element={<AdminCategorias />} />
            <Route path="/administrador/eventos" element={<AdminEventos />} />
            <Route path="/administrador/pagos" element={<AdminPagos />} />
          </Route>

          {/* Crear Proyecto */}
          <Route path="/crear-proyecto" element={<CrearProyectoPage />} />

          {/* Descubrir Proyectos */}
          <Route path="/proyectos" element={<ProyectosPage />} />

          {/* Usuario */}
          <Route path="/usuario/:id?" element={<UsuarioPage />} />

          {/* Proyecto */}
          <Route path="/proyecto/:id" element={<ProyectoPage />} />

          {/* Proyecto Sobre Nosotros */}
          <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />

          {/* Contacto */}
          <Route path="/contacto" element={<ContactoPage />} />

          {/* Eventos */}
          <Route path="/eventos" element={<EventosPage />} />

          {/* Aviso Legal */}
          <Route path="/aviso-legal" element={<AvisoLegalPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;