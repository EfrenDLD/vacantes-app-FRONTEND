import { Routes, Route } from "react-router-dom";
import { FormularioVacante } from "./components/FormularioVacante";
import ListaVacantes from "./pages/usuarioVisitante/listaVacantes";
import Vacantes from "./pages/usuarioVisitante/vacantes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/formularioVacante" element={<FormularioVacante />} />  
      <Route path="/listaVacantes" element={<ListaVacantes />} />
      <Route path="/vacantes" element={<Vacantes />} />

    </Routes>
  );
};

export default AppRoutes;
