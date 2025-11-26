import { Routes, Route } from "react-router-dom";
import Principal from "./pages/paginaPrincipal/principal.jsx";
import ListaVacantes from "./pages/usuarioVisitante/listaVacantes.jsx";
import Vacantes from "./pages/usuarioVisitante/vacantes.jsx";
import { DetalleVacante } from "./pages/DetallesVacantes/DetallesVacantes.jsx";
import { VisitanteLayout } from "./layouts/VisitanteLayout.jsx";
import { Error404 } from "./pages/Error404/Error404.jsx";
import Login from "./Login/login.jsx";
import { NavAdmin } from "./components/NavAdmin/NavAdmin.jsx";
import { NavVisitante } from "./components/NavAdmin/NavVisitante.jsx";
import { GestionFormularioVacantes } from "./pages/FormularioVacantes/GestionFormularioVacantes.jsx";
import { ListarVacantesAdministrador } from "./pages/usuarioAdministrador/ListarVacantesAdministrador.jsx";
import PrivateRoute from "./components/ProtectRoutes/PrivateRoute.jsx";
import { Acerca } from "./pages/acerca/Acerca.jsx";
import { FormularioUsuario } from "./pages/FormularioUsuario/formularioUsuario.jsx"

const AppRoutes = () => {
  return (
    <Routes>

      {/* Rutas de visitante */}
      <Route element={<VisitanteLayout />}>
        <Route path="/" element={<Principal />} />
        <Route path="/acerca" element={<Acerca/>} />
        <Route path="/vacantes" element={<Vacantes />} />
        <Route path="/detalleVacante/:id" element={<DetalleVacante />} />
        <Route path="/NavVisitante" element={<NavVisitante />} />
        <Route path="/listaVacante" element={<ListaVacantes />} />

      </Route>

      {/* Rutas de login */}
      <Route path="/login" element={<Login />} />

      {/* Rutas de administrador */}
      <Route path="/navAdmin" element={
        <PrivateRoute>
          <NavAdmin />
        </PrivateRoute>
      } />
      <Route path="/listarVacantesAdministrador" element={
        <PrivateRoute>
          <ListarVacantesAdministrador />
        </PrivateRoute>
      } /> 
      <Route path="/formularioVacante" element={
        <PrivateRoute>
          <GestionFormularioVacantes />
        </PrivateRoute>
      } />
      <Route path="/formularioVacante/:id" element={
        <PrivateRoute>
          <GestionFormularioVacantes />
        </PrivateRoute>
      } />
      <Route path="/crearUsuario" element={
        <PrivateRoute>
          <FormularioUsuario />
        </PrivateRoute>
      } />

      {/* Catch all route */}
      <Route path="*" element={<Error404 />} />

        <Route path="/acerca" element={<Acerca />} />
    </Routes>
  );
};

export default AppRoutes;
