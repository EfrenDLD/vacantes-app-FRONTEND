import { Routes, Route } from "react-router-dom";
import { FormularioVacante } from "./pages/FormularioVacantes/FormularioVacantes.jsx";
import { NavAdmin } from "./components/NavAdmin/NavAdmin.jsx";
import { ListarVacantesAdministrador } from "./pages/usuarioAdministrador/ListarVacantesAdministrador.jsx";
import ListaVacantes from "./pages/usuarioVisitante/listaVacantes";
import Vacantes from "./pages/usuarioVisitante/vacantes";
import { GestionFormularioVacantes } from "./pages/FormularioVacantes/GestionFormularioVacantes.jsx";
import { PaginacionVacantes } from "./components/paginacionVacantes/paginacionVacantes.jsx";


const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/navAdmin" element={<NavAdmin />} />
        <Route path="/formularioVacante" element={<GestionFormularioVacantes />} />  
        <Route path="/formularioVacante/:id" element={<GestionFormularioVacantes />} />
        <Route path="/listaVacantes" element={<ListaVacantes />} />
        <Route path="/vacantes" element={<Vacantes />} />
        <Route path="/paginacion" element={<PaginacionVacantes />} />
        <Route path="/listarVacantesAdministrador" element={<ListarVacantesAdministrador />} />
    </Routes>
  );
};

export default AppRoutes;