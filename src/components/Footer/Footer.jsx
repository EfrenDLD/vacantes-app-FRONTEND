import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Footer = () => {
  return (
    <footer
      className="mt-5 pt-4 pb-3"
      style={{
        background: "linear-gradient(180deg, #dbe0e9ff 0%, #F1F4F9 100%)",
        color: "#5C636A",
        borderTop: "2px solid #dbe0e9ff",
      }}
    >
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Columna 1 - Información general */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">TecnoSierra</h5>
            <p className="small mb-0">
              Plataforma de administración de vacantes.  
              Gestiona, crea y visualiza tus ofertas laborales con facilidad.
            </p>
          </div>

          {/* Columna 3 - Contacto */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Contacto</h6>
            <p className="small mb-0">contacto@tecnosierra.com</p>
            <p className="small mb-0">Oaxaca, UNSIJ-TecnoSierra</p>
          </div>
        </div>

        <hr className="mt-4 mb-3" style={{ borderColor: "#D5E3FC" }} />

        {/* Línea inferior */}
        <div className="text-center small">
          <p className="mb-0">
            © {new Date().getFullYear()} TecnoSierra, Inc. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
