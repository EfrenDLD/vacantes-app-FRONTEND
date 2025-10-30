import React from "react";
import "../../styles/usuarioAdministrador/ListarVacantesAdministrador.css";

export const ListarVacantesAdministrador = () => {
  const vacantes = [
    { id: 1, nombre: "Nombre vacante", fecha: "2025-10-30" },
    { id: 2, nombre: "Nombre vacante", fecha: "2025-10-30" },
    { id: 3, nombre: "Nombre vacante", fecha: "2025-10-30" },
  ];

  return (
    <div className="listarAdmin-container">
      <main className="listarAdmin-main">
        <h3 className="listarAdmin-titulo-tabla">Lista de Vacantes</h3>
        <table className="listarAdmin-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vacante</th>
              <th>Publicado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vacantes.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.nombre}</td>
                <td>{v.fecha}</td>
                <td>
                  <button className="listarAdmin-btn-detalles">Ver Detalles</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};