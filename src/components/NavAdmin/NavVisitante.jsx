import React from "react";
import { Link } from "react-router-dom";

export const NavVisitante = () => {
  return (
    <div className="container">
      <div className="d-flex align-items-top"></div>
      <div className="row">
        <div className="col">
          <h3 className="text-start">My Company</h3>
        </div>
      </div>
      <div className="row bg-light mt-2 rounded-2">
        <div className="col-4">
          <Link to="/" className="btn w-100 text-decoration-none">
            Inicio
          </Link>
        </div>
        <div className="col-4">
          <Link to="/administracion" className="btn w-100 text-decoration-none">
            Administración
          </Link>
        </div>
        <div className="col-4">
          <Link to="/acerca" className="btn w-100 text-decoration-none">
            Acerca
          </Link>
        </div>
      </div>
    </div>
  );
};
