import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { PaginacionVacantes } from "../../components/paginacionVacantes/paginacionVacantes";
import { NavAdmin } from "../../components/NavAdmin/NavAdmin";
import vacanteService from "../../service/VacanteService";
import { useNavigate } from "react-router-dom";

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
    // Aquí puedes agregar un intervalo para refrescar automáticamente:
    // const interval = setInterval(() => obtenerVacantes(), 30000);
    // return () => clearInterval(interval);
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

      {/* Título de la sección */}
      <div className="panel-heading mb-3 border-bottom pb-2">
        <h4 className="panel-title text-secondary m-0">{titulo}</h4>
      </div>

      <div className="panel-body">

        {/* Tabla de vacantes */}
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
                    {/* Cambiar estado */}
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

                    {/* Ver detalles */}
                    <button
                      className="btn btn-sm me-2 btn-outline-dark"
                      onClick={() => verDetalles(v.id)}
                    >
                      Ver Detalles
                    </button>

                    {/* Eliminar */}
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleEliminar(v.id)}
                    >
                      Eliminar
                    </button>

                    {/* Editar */}
                    <button
                      className="btn btn-outline-primary ms-2"
                      onClick={() => handlerEditar(v)}
                    >
                      Editar
                    </button>

                    {/* Aquí podrías agregar nuevas funciones, por ejemplo:
                       - Clonar vacante
                       - Ver postulaciones
                       - Exportar detalles
                       - Historial de cambios
                    */}
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

        {/* Paginación */}
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

      {/* Tabla de vacantes activas */}
      {renderTabla(
        vacantesActivasPaginadas,
        "Vacantes Activas",
        currentPageActivas,
        totalPagesActivas,
        setCurrentPageActivas
      )}

      {/* Tabla de vacantes inactivas */}
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