import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {

  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  const userData = sessionStorage.getItem("user");

  // Si no existe sesión → bloqueo total
  if (!isAuthenticated || !userData) {
    Swal.fire({
      icon: "warning",
      title: "Acceso restringido",
      text: "Inicia sesión para continuar.",
    });

    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userData);

  // Validación estricta del rol
  if (user.perfil !== "ADMIN") {
    Swal.fire({
      icon: "error",
      title: "Acceso denegado",
      text: "No cuentas con permisos para acceder al panel de administración.",
    });

    sessionStorage.clear(); // Limpia cualquier manipulación
    return <Navigate to="/login" replace />;
  }

  // Si pasa todas las validaciones → renderiza la vista
  return children;
};

export default PrivateRoute;
