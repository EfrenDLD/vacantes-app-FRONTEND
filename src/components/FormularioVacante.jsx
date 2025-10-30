import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const FormularioVacante = () => {
  return (
    <div className="container">
      {/* Encabezado */}
      <div className="masthead mt-4">
        <h3 className="text-muted">My Company - Administración</h3>
        <nav>
          <ul className="nav nav-justified">
            <li className="nav-item">
              <a href="#" className="nav-link">
                Crear Vacante
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Vacantes
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Salir
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Panel de formulario */}
      <div className="panel panel-default mt-4">
        <div className="panel-heading">
          <h3 className="panel-title">Crear Vacante</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group mb-3">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                id="nombre"
                required
                placeholder="Escriba el nombre de la vacante"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                className="form-control"
                name="descripcion"
                id="descripcion"
                rows="3"
                required
                placeholder="Escribe una descripción de la vacante"
              ></textarea>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="detalle">Escriba los detalles</label>
              <textarea
                className="form-control"
                name="detalle"
                id="detalle"
                rows="4"
                placeholder="Escriba los detalles de la vacante"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </form>
        </div>
      </div>

      {/* Pie de página */}
      <footer className="footer mt-4 mb-4">
        <p>&copy; 2016 My Company, Inc.</p>
      </footer>
    </div>
  );
};