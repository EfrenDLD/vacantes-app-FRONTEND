import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const DetalleVacante = () => {
  return (
    <div className="container my-4">

      <form method="post" action="#" className="d-flex justify-content-end mb-4">
        <div className="form-group me-2">
          <input
            type="text"
            name="query"
            required
            placeholder="Buscar oferta..."
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Buscar
        </button>
      </form>

      <div className="panel panel-primary">
        <div className="panel-heading bg-primary text-white p-2 rounded-top">
          <h3 className="panel-title m-0">Número de la vacante: 4</h3>
        </div>
        <div className="panel-body border p-3 rounded-bottom">
          <h5>
            <b>Vacante:</b> Ingeniero de Software Senior (Backend)
          </h5>
          <h5>
            <b>Publicado:</b> 2025-10-15
          </h5>
          <b>Descripción:</b>
          <p className="text-justify">Desarrollo Backend:

Diseñar, implementar y mantener APIs RESTful eficientes, escalables y seguras utilizando Node.js y frameworks como Express.
Garantizar la correcta comunicación e interoperabilidad entre los sistemas backend y frontend.</p>
          <b>Detalles de la vacante:</b>
          <p>Buscamos un Ingeniero de Software Full Stack talentoso y proactivo para unirse a nuestro equipo. Serás una pieza clave en el ciclo de vida completo del desarrollo, desde el diseño de la arquitectura hasta la implementación y pruebas.

El candidato ideal es un apasionado por la tecnología, con experiencia sólida tanto en el frontend con Angular como en el backend con Node.js, y que no teme enfrentarse a retos complejos, como la gestión documental y modelos criptográficos.</p>
        </div>
      </div>

      <footer className="footer mt-5 text-center">
        <p>&copy; 2016 My Company, Inc.</p>
      </footer>
    </div>
  );
};
