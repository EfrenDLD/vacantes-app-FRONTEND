import { NavAdmin } from "../../components/NavAdmin/NavAdmin";
import ListaVacantes from "./listaVacantes";

export default function Vacantes() {
  return (
    <div className="d-flex flex-column align-items-center">
      <NavAdmin></NavAdmin>
      <div className="w-75 h-50 p-4">
        <ListaVacantes />
      </div>
    </div>
  );
}