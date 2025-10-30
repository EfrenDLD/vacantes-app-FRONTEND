import { Routes, Route } from "react-router-dom";
import { FormularioVacante } from "./pages/FormularioVacantes/FormularioVacantes.jsx";
import { NavAdmin } from "./components/NavAdmin/NavAdmin.jsx";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/navAdmin" element={<NavAdmin />} />
        <Route path="/formularioVacante" element={<FormularioVacante />} />
    </Routes>
  );
};

export default AppRoutes;