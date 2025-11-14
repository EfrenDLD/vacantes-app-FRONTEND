import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "../../styles/usuarioAdministrador/ListarVacantesAdministrador.css";
import VacanteService from "../../service/VacanteService";
import { useNavigate } from "react-router-dom";


export const ListarVacantesAdministrador = () => {
  const [vacantes, setVacantes] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    obtenerVacantes();
  }, []);

  const obtenerVacantes = async () => {
    try {
      const response = await VacanteService.getAll();
      // Transformar los datos al formato esperado por la tabla
      const vacantesFormateadas = response.data.map(v => ({
        id: v.id,
        nombre: v.nombre,
        fecha: v.fechaPublicacion,
        estado: v.activo ? "Activa" : "Inactiva",
        // Puedes agregar más campos si los necesitas
      }));
      setVacantes(vacantesFormateadas);
    } catch (error) {
      console.error("Error al obtener las vacantes:", error);
      // Opcional: setVacantes([]) o mostrar mensaje de error
    }
  };

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
      setVacantes((prev) =>
        prev.map((v) => (v.id === vacante.id ? { ...v, estado: nuevoEstado } : v))
      );
      Swal.fire({
        icon: "success",
        title: `Vacante ${nuevoEstado === "Activa" ? "activada" : "inactivada"} correctamente.`,
        timer: 1800,
        showConfirmButton: false,
      });
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

  const handlerEditar = (vacante) => {
    navigate(`/formularioVacante/${vacante.id}`);
  };

  const vacantesActivas = vacantes.filter((v) => v.estado === "Activa");
  const vacantesInactivas = vacantes.filter((v) => v.estado === "Inactiva");

  const renderTabla = (lista, titulo) => (
    <div className="panel panel-default my-4">
      <div className="panel-heading p-2">
        <h4 className="panel-title m-0">{titulo}</h4>
      </div>
      <div className="panel-body p-3">
        <table className="table table-striped">
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
                      className="btn btn-secondary btn-sm me-2"
                      onClick={() => handleCambiarEstado(v)}
                    >
                      {v.estado === "Activa" ? "Desactivar" : "Activar"}
                    </button>

                    <button className="btn btn-secondary btn-sm me-2">
                      Ver Detalles
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEliminar(v.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-primary ms-2"
                      onClick={() => handlerEditar(v)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No hay vacantes registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container my-4">
      {renderTabla(vacantesActivas, "Vacantes Activas")}
      {renderTabla(vacantesInactivas, "Vacantes Inactivas")}
    </div>
  );
};
