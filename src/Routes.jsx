import { Routes, Route } from "react-router-dom";
import { FormularioVacante } from "./components/FormularioVacante";
import ListaVacantes from "./pages/usuarioVisitante/listaVacantes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/formularioVacante" element={<FormularioVacante />} />  
      <Route path="/listaVacantes" element={<ListaVacantes />} />

    </Routes>
  );
};

export default AppRoutes;
