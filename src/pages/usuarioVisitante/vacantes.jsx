import ListaVacantes from "./listaVacantes";

export default function Vacantes() {
  return (
    <div style={{width:'200%', justifyContent:'center', marginLeft:'-50%'}}>
      <h1 className="text-black p-3">My Company</h1>
      <ListaVacantes />
    </div>
  );
}