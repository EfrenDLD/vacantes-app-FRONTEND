import { Routes, Route } from "react-router-dom";
import { FormularioVacante } from "./pages/FormularioVacantes/FormularioVacantes.jsx";
import { NavAdmin } from "./components/NavAdmin/NavAdmin.jsx";
import { ListarVacantesAdministrador } from "./pages/usuarioAdministrador/ListarVacantesAdministrador.jsx";
import ListaVacantes from "./pages/usuarioVisitante/listaVacantes";
import Vacantes from "./pages/usuarioVisitante/vacantes";
import { GestionFormularioVacantes } from "./pages/FormularioVacantes/GestionFormularioVacantes.jsx";
import { PaginacionVacantes } from "./components/paginacionVacantes/paginacionVacantes.jsx";
import { DetalleVacante } from "./pages/DetallesVacantes/DetallesVacantes.jsx";

import Login from "./Login/login.jsx";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />
        <Route path="/navAdmin" element={<NavAdmin />} />
        <Route path="/formularioVacante" element={<GestionFormularioVacantes />} />  
        <Route path="/listaVacantes" element={<ListaVacantes />} />
        <Route path="/vacantes" element={<Vacantes />} />
        <Route path="/paginacion" element={<PaginacionVacantes />} />
        <Route path="/listarVacantesAdministrador" element={<ListarVacantesAdministrador />} />
        <Route path="/detalleVacante/:id" element={<DetalleVacante />} />
    </Routes>
  );
};

export default AppRoutes;