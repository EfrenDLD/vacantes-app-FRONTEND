import { Routes, Route } from "react-router-dom";
import { FormularioVacante } from "./pages/FormularioVacantes/FormularioVacantes.jsx";
import { NavAdmin } from "./components/NavAdmin/NavAdmin.jsx";
import { ListarVacantesAdministrador } from "./pages/usuarioAdministrador/ListarVacantesAdministrador.jsx";
import ListaVacantes from "./pages/usuarioVisitante/listaVacantes";
import Vacantes from "./pages/usuarioVisitante/vacantes";
import { DetalleVacante } from "./pages/DetallesVacantes/DetallesVacantes.jsx";


const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/navAdmin" element={<NavAdmin />} />
        <Route path="/formularioVacante" element={<FormularioVacante />} />  
        <Route path="/listaVacantes" element={<ListaVacantes />} />
        <Route path="/vacantes" element={<Vacantes />} />
        <Route path="/listarVacantesAdministrador" element={<ListarVacantesAdministrador />} />
        <Route path="/detalleVacante" element={<DetalleVacante/>}/>
    </Routes>
  );
};

export default AppRoutes;