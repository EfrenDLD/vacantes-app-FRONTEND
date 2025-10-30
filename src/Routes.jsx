import { Routes, Route } from "react-router-dom";
import { FormularioVacante } from "./components/FormularioVacante";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/formularioVacante" element={<FormularioVacante />} />
    </Routes>
  );
};

export default AppRoutes;
