import React from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (!isAuthenticated) {
    Swal.fire({
      icon: "warning",
      title: "Acceso restringido",
      text: "Inicia sesión para continuar.",
    });
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;