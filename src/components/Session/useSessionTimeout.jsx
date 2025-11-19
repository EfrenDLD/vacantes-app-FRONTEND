import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TIMEOUT_MINUTES = 15;
const TIMEOUT_MS = TIMEOUT_MINUTES * 60 * 1000; // 15 min

export const useSessionTimeout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const updateActivity = () => {
      if (sessionStorage.getItem("isAuthenticated")) {
        sessionStorage.setItem("lastActivity", Date.now());
      }
    };

    // Eventos que cuentan como actividad
    window.addEventListener("click", updateActivity);
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("scroll", updateActivity);

    const interval = setInterval(() => {
      const last = sessionStorage.getItem("lastActivity");

      if (!last) return;

      const now = Date.now();
      const diff = now - last;

      if (diff >= TIMEOUT_MS) {
        sessionStorage.clear();

        Swal.fire({
          icon: "warning",
          title: "Sesión expirada",
          text: "Inicia sesión nuevamente.",
        });

        navigate("/login", { replace: true });
      }
    }, 60000); // Verifica cada 1 minuto

    return () => {
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("scroll", updateActivity);
      clearInterval(interval);
    };
  }, [navigate]);
};
