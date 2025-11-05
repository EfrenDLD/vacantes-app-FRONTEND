import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import vacanteService from "../../service/VacanteService"; 
import "bootstrap/dist/css/bootstrap.min.css";

export const DetalleVacante = () => {
  const { id } = useParams(); 
  const [vacante, setVacante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVacante = async () => {
      try {
        const data = await vacanteService.getById(id); 
        setVacante(data.data); 
      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchVacante();
  }, [id]);


  if (loading) {
    return (
      <div className="container my-4 text-center">
        <p>Cargando detalles de la vacante...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-4 text-center">
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }


  if (!vacante) {
    return (
      <div className="container my-4 text-center">
        <p>No se encontró la vacante solicitada.</p>
      </div>
    );
  }


  return (
    <div className="container my-4">

      <div className="panel panel-primary">
        <div className="panel-heading bg-primary text-white p-2 rounded-top">
          <h3 className="panel-title m-0">
            Número de la vacante: {vacante.id}
          </h3>
        </div>
        <div className="panel-body border p-3 rounded-bottom">
          <h5>
            <b>Vacante:</b> {vacante.nombre}
          </h5>
          <h5>
            <b>Publicado:</b>{" "}
            {vacante.fechaPublicacion || "Sin fecha"}
          </h5>
          <b>Descripción:</b>
          <p className="text-justify">{vacante.descripcion}</p>
          <b>Detalles de la vacante:</b>
          <p>{vacante.detalle}</p>
        </div>
      </div>

      <footer className="footer mt-5 text-center">
        <p>&copy; 2025 My Company, Inc.</p>
      </footer>
    </div>
  );
};
