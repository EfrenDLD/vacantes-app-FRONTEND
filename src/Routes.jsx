import { Routes, Route } from "react-router-dom";
import Principal from "./pages/paginaPrincipal/principal.jsx";
import ListaVacantes from "./pages/usuarioVisitante/listaVacantes.jsx";
import Vacantes from "./pages/usuarioVisitante/vacantes.jsx";
import { DetalleVacante } from "./pages/DetallesVacantes/DetallesVacantes.jsx";
import { VisitanteLayout } from "./layouts/VisitanteLayout.jsx";
import { Error404 } from "./pages/Error404/Error404.jsx";
import Login from "./Login/login.jsx";
import { NavAdmin } from "./components/NavAdmin/NavAdmin.jsx";
import { GestionFormularioVacantes } from "./pages/FormularioVacantes/GestionFormularioVacantes.jsx";
import { ListarVacantesAdministrador } from "./pages/usuarioAdministrador/ListarVacantesAdministrador.jsx";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Rutas de visitante */}
      <Route element={<VisitanteLayout />}>
        <Route path="/principal" element={<Principal />} />
        <Route path="/acerca" element={<div>Acerca de la Empresa</div>} />
        <Route path="/vacantes" element={<Vacantes />} />
        <Route path="/detalleVacante/:id" element={<DetalleVacante />} />
      </Route>

      {/* Rutas de login */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Rutas de administrador */}
      <Route path="/navAdmin" element={<NavAdmin />} />
      <Route path="/listarVacantesAdministrador" element={<ListarVacantesAdministrador />} />
      <Route path="/formularioVacante" element={<GestionFormularioVacantes />} />
      <Route path="/formularioVacante/:id" element={<GestionFormularioVacantes />} />

      {/* Catch all route */}
      <Route path="*" element={<Error404 />} />

    </Routes>
  );
};

export default AppRoutes;
