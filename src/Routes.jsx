import { Routes, Route } from "react-router-dom";
import { FormularioVacante } from "./pages/FormularioVacantes/FormularioVacantes.jsx";
import { NavAdmin } from "./components/NavAdmin/NavAdmin.jsx";
import Login from "./Login/login.jsx";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />
        <Route path="/navAdmin" element={<NavAdmin />} />
        <Route path="/formularioVacante" element={<FormularioVacante />} />
    </Routes>
  );
};

export default AppRoutes;