import { NavAdmin } from "../../components/NavAdmin/NavAdmin";
import { NavVisitante } from "../../components/NavAdmin/NavVisitante";
import ListaVacantes from "./listaVacantes";

export default function Vacantes() {
  return (
    <div className="d-flex flex-column align-items-center">
      <NavVisitante/>
      <div className="w-75 h-50 p-4">
        <ListaVacantes />
      </div>
    </div>
  );
}