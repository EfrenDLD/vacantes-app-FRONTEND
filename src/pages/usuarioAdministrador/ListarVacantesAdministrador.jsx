import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { PaginacionVacantes } from "../../components/paginacionVacantes/paginacionVacantes";
import { NavAdmin } from "../../components/NavAdmin/NavAdmin";
import vacanteService from "../../service/VacanteService";
import { useNavigate } from "react-router-dom";
import "../../styles/FormularioVacantesStyle/Vacantes.css";

export const ListarVacantesAdministrador = () => {

  // Estado con todas las vacantes cargadas desde el backend
  const [vacantes, setVacantes] = useState([]);

  // Estados independientes para paginar activas e inactivas
  const [currentPageActivas, setCurrentPageActivas] = useState(1);
  const [currentPageInactivas, setCurrentPageInactivas] = useState(1);

  // Cantidad de vacantes por página
  const vacantesPorPagina = 8;

  const navigate = useNavigate();

  // Se ejecuta al cargar el componente para traer las vacantes
  useEffect(() => {
    obtenerVacantes();
    
  }, []);

  // Redirección a detalles
  const verDetalles = (id) => {
    navigate(`/detalleVacante/${id}`);
  };

  // Trae todas las vacantes del backend y formatea estados/fecha
  const obtenerVacantes = async () => {
    try {
      const data = await vacanteService.getAll();

      // Validación por si backend no regresa arreglo
      if (!Array.isArray(data)) {
        setVacantes([]);
        return;
      }

      // Se formatea cada vacante para mostrar fecha y estado legible
      const vacantesFormateadas = data.map(v => ({
        ...v,
        fecha: v.fechaPublicacion
          ? new Date(v.fechaPublicacion).toLocaleDateString()
          : "",
        estado: v.activo ? "Activa" : "Inactiva",
      }));

      setVacantes(vacantesFormateadas);

      // Aquí se podrían aplicar filtros adicionales por categoría, salario, etc.

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error al obtener vacantes",
        text: error.toString(),
      });
    }
  };

  // Cambiar estado de una vacante (Activa / Inactiva)
  const handleCambiarEstado = async (vacante) => {
    const nuevoEstado = vacante.estado === "Activa" ? "Inactiva" : "Activa";
    const activo = nuevoEstado === "Activa";

    // Confirmación con SweetAlert
    const confirmacion = await Swal.fire({
      title: "¿Cambiar estado?",
      text: `¿Deseas marcar la vacante "${vacante.nombre}" como ${nuevoEstado}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        await vacanteService.cambiarEstado(vacante.id, activo);

        // Actualiza el estado local sin recargar todo
        setVacantes((prev) =>
          prev.map((v) =>
            v.id === vacante.id ? { ...v, estado: nuevoEstado } : v
          )
        );

        // Aquí podrías actualizar la fecha de modificación para mostrarla en la tabla

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

  // Eliminar vacante
  const handleEliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: "¿Eliminar vacante?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        // Aquí podrías agregar validaciones antes de eliminar
        await vacanteService.deleteById(id);

        // Se elimina de la tabla sin volver a llamar al backend
        setVacantes((prev) => prev.filter((v) => v.id !== id));

      } catch (error) {
        console.error("Error al eliminar la vacante:", error);
      }

      Swal.fire({
        icon: "success",
        title: "Vacante eliminada correctamente.",
        timer: 1800,
        showConfirmButton: false,
      });
    }
  };

  // Redirige al formulario de edición
  const handlerEditar = (vacante) => {
    navigate(`/formularioVacante/${vacante.id}`);
    // Aquí se podría guardar la vacante en un estado global o contexto si deseas prellenar el formulario
  };

  // Filtros de activas e inactivas
  const vacantesActivas = vacantes.filter((v) => v.estado === "Activa");
  const vacantesInactivas = vacantes.filter((v) => v.estado === "Inactiva");

  // Cálculo de páginas
  const totalPagesActivas = Math.ceil(vacantesActivas.length / vacantesPorPagina);
  const totalPagesInactivas = Math.ceil(vacantesInactivas.length / vacantesPorPagina);

  // Índices para paginación
  const inicioActivas = (currentPageActivas - 1) * vacantesPorPagina;
  const inicioInactivas = (currentPageInactivas - 1) * vacantesPorPagina;

  // Listas paginadas para mostrar
  const vacantesActivasPaginadas = vacantesActivas.slice(
    inicioActivas,
    inicioActivas + vacantesPorPagina
  );
  const vacantesInactivasPaginadas = vacantesInactivas.slice(
    inicioInactivas,
    inicioInactivas + vacantesPorPagina
  );

  // Render reutilizable para ambas tablas
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
              <th className="d-none d-md-table-cell">Publicado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {lista.length > 0 ? (
              lista.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.nombre}</td>
                  <td className="d-none d-md-table-cell">{v.fecha}</td>

                  <td className="text-center">

                    {/* BOTONES NORMALES EN PANTALLAS GRANDES */}
                    <div className="d-none d-md-block">
                      <button
                        className={`btn btn-sm me-2 ${
                          v.estado === "Activa"
                            ? "btn-outline-danger"
                            : "btn-outline-success"
                        }`}
                        onClick={() => handleCambiarEstado(v)}
                      >
                        {v.estado === "Activa" ? "Desactivar" : "Activar"}
                      </button>

                      <button
                        className="btn btn-sm me-2 btn-outline-dark"
                        onClick={() => verDetalles(v.id)}
                      >
                        Ver Detalles
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger me-2"
                        onClick={() => handleEliminar(v.id)}
                      >
                        Eliminar
                      </button>

                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handlerEditar(v)}
                      >
                        Editar
                      </button>
                    </div>

                    {/* MENÚ RESPONSIVO DE 3 PUNTOS (SIN FLECHA) */}
                    <div className="dropdown d-md-none">
                      <button
                        className="menu-3puntos"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        ⋮
                      </button>

                      <ul className="dropdown-menu dropdown-menu-custom">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleCambiarEstado(v)}
                          >
                            {v.estado === "Activa" ? "Desactivar" : "Activar"}
                          </button>
                        </li>

                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => verDetalles(v.id)}
                          >
                            Ver detalles
                          </button>
                        </li>

                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => handleEliminar(v.id)}
                          >
                            Eliminar
                          </button>
                        </li>

                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handlerEditar(v)}
                          >
                            Editar
                          </button>
                        </li>
                      </ul>
                    </div>

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