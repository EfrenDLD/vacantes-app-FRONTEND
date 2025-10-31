import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../styles/usuarioAdministrador/ListarVacantesAdministrador.css";

export const ListarVacantesAdministrador = () => {
  const [vacantes, setVacantes] = useState([]);

  //Cargar vacantes desde el backend
  useEffect(() => {
    obtenerVacantes();
  }, []);

  const obtenerVacantes = async () => {
    try {
      // const respuesta = await vacanteService.getAll();
      // setVacantes(respuesta.data);

      // Datos temporales para pruebas
      setVacantes([
        { id: 1, nombre: "Desarrollador Frontend", fecha: "2025-10-30", estado: "Activa" },
        { id: 2, nombre: "Diseñador UX/UI", fecha: "2025-10-28", estado: "Inactiva" },
        { id: 3, nombre: "Administrador de Sistemas", fecha: "2025-10-25", estado: "Activa" },
        { id: 4, nombre: "Tester QA", fecha: "2025-10-22", estado: "Inactiva" },
      ]);
    } catch (error) {
      console.error("Error al obtener las vacantes:", error);
    }
  };

  //Cambiar estado (activar / inactivar)
  const handleCambiarEstado = async (vacante) => {
    const nuevoEstado = vacante.estado === "Activa" ? "Inactiva" : "Activa";

    const confirmacion = await Swal.fire({
      title: "¿Cambiar estado?",
      text: `¿Deseas marcar la vacante "${vacante.nombre}" como ${nuevoEstado}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (confirmacion.isConfirmed) {
      try {
        // await vacanteService.updateEstado(vacante.id, nuevoEstado);
        // await obtenerVacantes();
        Swal.fire({
          icon: "success",
          title: `Vacante ${nuevoEstado === "Activa" ? "activada" : "inactivada"} correctamente.`,
          timer: 1800,
          showConfirmButton: false,
        });

        //Actualización temporal (sin backend)
        setVacantes((prev) =>
          prev.map((v) =>
            v.id === vacante.id ? { ...v, estado: nuevoEstado } : v
          )
        );
      } catch (error) {
        console.error("Error al cambiar estado:", error);
      }
    }
  };

  // Eliminar vacante
  const handleEliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: "¿Eliminar vacante?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (confirmacion.isConfirmed) {
      try {
        // await vacanteService.deleteVacante(id);
        // await obtenerVacantes();
        setVacantes((prev) => prev.filter((v) => v.id !== id));
        Swal.fire({
          icon: "success",
          title: "Vacante eliminada correctamente.",
          timer: 1800,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error al eliminar la vacante:", error);
      }
    }
  };

  // Clases CSS para estado
  const getEstadoClass = (estado) => {
    switch (estado) {
      case "Activa":
        return "estado-activa";
      case "Inactiva":
        return "estado-inactiva";
      default:
        return "";
    }
  };

  // Separar vacantes activas e inactivas
  const vacantesActivas = vacantes.filter((v) => v.estado === "Activa");
  const vacantesInactivas = vacantes.filter((v) => v.estado === "Inactiva");

  // Renderizar tabla reutilizable
  const renderTabla = (lista, titulo) => (
    <div className="listarAdmin-seccion">
      <h3 className="listarAdmin-titulo-tabla">{titulo}</h3>
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
          {lista.length > 0 ? (
            lista.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.nombre}</td>
                <td>{v.fecha}</td>
                <td>
                  <button
                    className={`listarAdmin-btn-estado ${v.estado === "Activa" ? "btn-desactivar" : "btn-activar"}`}
                    onClick={() => handleCambiarEstado(v)} // <-- aquí
                  >
                    {v.estado === "Activa" ? "Desactivar" : "Activar"}
                  </button>

                  <button className="listarAdmin-btn-detalles">
                    Ver Detalles
                  </button>

                  <button
                    className="listarAdmin-btn-eliminar"
                    onClick={() => handleEliminar(v.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="sin-vacantes">
                No hay vacantes registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="listarAdmin-container">
      <main className="listarAdmin-main">
        {renderTabla(vacantesActivas, "Vacantes Activas")}
        {renderTabla(vacantesInactivas, "Vacantes Inactivas")}
      </main>
    </div>
  );
};
