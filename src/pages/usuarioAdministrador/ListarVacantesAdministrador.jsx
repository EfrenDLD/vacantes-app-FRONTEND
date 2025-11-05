import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { PaginacionVacantes } from "../../components/paginacionVacantes/paginacionVacantes";
import { NavAdmin } from "../../components/NavAdmin/NavAdmin";
import vacanteService from "../../service/VacanteService";

export const ListarVacantesAdministrador = () => {
  const [vacantes, setVacantes] = useState([]);
  const [currentPageActivas, setCurrentPageActivas] = useState(1);
  const [currentPageInactivas, setCurrentPageInactivas] = useState(1);
  const vacantesPorPagina = 8;

  useEffect(() => {
    obtenerVacantes();
  }, []);

  const obtenerVacantes = async () => {
    try {
      const data = await vacanteService.getAll();
      if (!Array.isArray(data)) {
        setVacantes([]);
        return;
      }
      const vacantesFormateadas = data.map(v => ({
        ...v,
        fecha: v.fechaPublicacion
          ? new Date(v.fechaPublicacion).toLocaleDateString()
          : "",
        estado: v.activo ? "Activa" : "Inactiva",
      }));
      setVacantes(vacantesFormateadas);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error al obtener vacantes",
        text: error.toString(),
      });
    }
  };

  // --- Funciones para cambiar estado y eliminar ---
  const handleCambiarEstado = async (vacante) => {
    const nuevoEstado = vacante.estado === "Activa" ? "Inactiva" : "Activa";
    const activo = nuevoEstado === "Activa"; 

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
        await vacanteService.cambiarEstado(vacante.id, activo);

        setVacantes((prev) =>
          prev.map((v) =>
            v.id === vacante.id ? { ...v, estado: nuevoEstado } : v
          )
        );

        Swal.fire({
          icon: "success",
          title: `Vacante ${nuevoEstado === "Activa" ? "activada" : "desactivada"} correctamente.`,
          timer: 1800,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al cambiar el estado",
          text: error.toString(),
        });
      }
    }
  };

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
        await VacanteService.deleteById(id);
      } catch (error) {
        console.error("Error al eliminar la vacante:", error);
      }
      setVacantes((prev) => prev.filter((v) => v.id !== id));
      Swal.fire({
        icon: "success",
        title: "Vacante eliminada correctamente.",
        timer: 1800,
        showConfirmButton: false,
      });
    }
  };

  // --- Filtrado ---
  const vacantesActivas = vacantes.filter((v) => v.estado === "Activa");
  const vacantesInactivas = vacantes.filter((v) => v.estado === "Inactiva");

  // --- Paginación ---
  const totalPagesActivas = Math.ceil(vacantesActivas.length / vacantesPorPagina);
  const totalPagesInactivas = Math.ceil(vacantesInactivas.length / vacantesPorPagina);

  const inicioActivas = (currentPageActivas - 1) * vacantesPorPagina;
  const inicioInactivas = (currentPageInactivas - 1) * vacantesPorPagina;

  const vacantesActivasPaginadas = vacantesActivas.slice(
    inicioActivas,
    inicioActivas + vacantesPorPagina
  );
  const vacantesInactivasPaginadas = vacantesInactivas.slice(
    inicioInactivas,
    inicioInactivas + vacantesPorPagina
  );

  const renderTabla = (lista, titulo, currentPage, totalPages, onPageChange) => (
    <div className="panel panel-default shadow-sm rounded p-3 mb-5 bg-white">
      <div className="panel-heading mb-3 border-bottom pb-2">
        <h4 className="panel-title text-secondary m-0">{titulo}</h4>
      </div>
      <div className="panel-body">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-light">
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
                      className={`btn btn-sm me-2 ${v.estado === "Activa" ? "btn-outline-danger" : "btn-outline-success"
                        }`}
                      onClick={() => handleCambiarEstado(v)}
                    >
                      {v.estado === "Activa" ? "Desactivar" : "Activar"}
                    </button>
                    <button className="btn btn-sm me-2 btn-outline-dark">
                      Ver Detalles
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleEliminar(v.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted py-3">
                  No hay vacantes registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <PaginacionVacantes
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="container my-5">
      <NavAdmin />

      {renderTabla(
        vacantesActivasPaginadas,
        "Vacantes Activas",
        currentPageActivas,
        totalPagesActivas,
        setCurrentPageActivas
      )}

      {renderTabla(
        vacantesInactivasPaginadas,
        "Vacantes Inactivas",
        currentPageInactivas,
        totalPagesInactivas,
        setCurrentPageInactivas
      )}
    </div>
  );
};