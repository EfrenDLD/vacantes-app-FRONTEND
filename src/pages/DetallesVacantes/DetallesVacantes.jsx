import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import vacanteService from "../../service/VacanteService"; 
import "bootstrap/dist/css/bootstrap.min.css";

// Componente que muestra los detalles de una vacante según su ID.
// Este componente se renderiza cuando el usuario entra a una ruta como /vacante/5
export const DetalleVacante = () => {

  // Obtiene el parámetro "id" desde la URL.
  // Ejemplo: /vacante/10 -> id = 10
  const { id } = useParams(); 

  // Estados del componente
  const [vacante, setVacante] = useState(null);      // Guarda la vacante obtenida
  const [loading, setLoading] = useState(true);       // Controla si está cargando
  const [error, setError] = useState(null);           // Guarda un mensaje de error si ocurre

  // useEffect que se ejecuta cuando el componente se monta o cambia el id
  useEffect(() => {
    // Función que llama al servicio para obtener los datos de la vacante
    const fetchVacante = async () => {
      try {
        // Llamada al backend usando el servicio
        const data = await vacanteService.getById(id); 

        // Guardar la vacante encontrada
        setVacante(data.data); 
      } catch (err) {
        // Captura cualquier error de la petición
        setError(err.toString());
      } finally {
        // Sea éxito o error, se deja de cargar
        setLoading(false);
      }
    };

    fetchVacante();

  }, [id]); // Se vuelve a ejecutar si cambia el id


  // Sección que se muestra mientras los datos están cargando
  if (loading) {
    return (
      <div className="container my-4 text-center">
        <p>Cargando detalles de la vacante...</p>
      </div>
    );
  }

  // Sección que se muestra si ocurre un error al obtener la vacante
  if (error) {
    return (
      <div className="container my-4 text-center">
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  // Caso en el que el ID no existe o el backend no devuelve información
  if (!vacante) {
    return (
      <div className="container my-4 text-center">
        <p>No se encontró la vacante solicitada.</p>
      </div>
    );
  }

  // Render principal cuando todo está correcto
  return (
    <div className="container my-4">

      {/* Panel con toda la información de la vacante */}
      <div className="panel panel-primary">
        <div className="panel-heading bg-primary text-white p-2 rounded-top">
          <h3 className="panel-title m-0">
            Número de la vacante: {vacante.id}
          </h3>
        </div>

        <div className="panel-body border p-3 rounded-bottom">

          {/* Nombre */}
          <h5>
            <b>Vacante:</b> {vacante.nombre}
          </h5>

          {/* Fecha de publicación */}
          <h5>
            <b>Publicado:</b>{" "}
            {vacante.fechaPublicacion || "Sin fecha"}
          </h5>

          {/* Descripción general */}
          <b>Descripción:</b>
          <p className="text-justify">{vacante.descripcion}</p>

          {/* Detalle extendido */}
          <b>Detalles de la vacante:</b>
          <p>{vacante.detalle}</p>

          {/* Ejemplo de dónde agregar nuevas funcionalidades:
              - Botón para aplicar a la vacante
              - Sección para ver requisitos
              - Mostrar salario
              - Mostrar ubicación
              - Mostrar contacto
              Puedes agregar componentes o bloques adicionales aquí. */}
        </div>
      </div>

      {/* Botón para regresar a la página anterior */}
      <div className="text-center mt-4">
        <button 
          className="btn btn-primary"
          onClick={() => window.history.back()}
        >
          Regresar
        </button>
      </div>

      {/* Footer del componente (estático) */}
      <footer className="footer mt-3 text-center">
        <p>&copy; 2025 My Company, Inc.</p>
      </footer>
    </div>
  );
};
