
import { useEffect } from 'react';
import './App.css'
import AppRoutes from './Routes.jsx';
import Swal from "sweetalert2";
import { useSessionTimeout } from "./components/Session/useSessionTimeout.jsx";


function App() {
  useSessionTimeout();
  useEffect(() => {
    const handleActivity = () => {
      localStorage.setItem("lastActivity", Date.now());
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    const interval = setInterval(() => {
      const lastActivity = localStorage.getItem("lastActivity");
      if (localStorage.getItem("isAuthenticated") === "true" && lastActivity) {
        const now = Date.now();
        if (now - lastActivity > 1 * 60 * 1000) { // 15 minutos
          localStorage.removeItem("isAuthenticated");
          Swal.fire({
            icon: "info",
            title: "Sesión expirada",
            text: "Sesión expirada por inactividad.",
          }).then(() => {
            window.location.href = "/login";
          });
        }
      }
    }, 10000); // revisa cada 10 segundos

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
