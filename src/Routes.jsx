import { Routes, Route } from "react-router-dom";
import { FormularioVacante } from "./pages/FormularioVacantes/FormularioVacantes.jsx";
import { NavAdmin } from "./components/NavAdmin/NavAdmin.jsx";
import { ListarVacantesAdministrador } from "./pages/usuarioAdministrador/ListarVacantesAdministrador.jsx";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/navAdmin" element={<NavAdmin />} />
        <Route path="/formularioVacante" element={<FormularioVacante />} />
        <Route path="/listarVacantesAdministrador" element={<ListarVacantesAdministrador />} />
    </Routes>
  );
};

export default AppRoutes;