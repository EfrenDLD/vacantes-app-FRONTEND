import React, { useState } from "react";
import Swal from "sweetalert2"; // Importar SweetAlert2
import axiosInstance from "../api/axiosConfig"; // Asegúrate que esta ruta sea correcta
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Login/login.css";
import lockImg from "../assets/lock.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos vacíos
    if (!username || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor ingrese usuario y contraseña",
      });
      return;
    }

    try {
      const response = await axiosInstance.post("/api/auth/login", {
        username,
        password,
      });

      console.log("RESPONSE DATA:", response.data); // <- ¡Agrega esto!

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: `Hola, ${response.data.username} (${response.data.perfil})`,
      });

      navigate("/vacantes");

    } catch (error) {
      console.log("ERROR RESPONSE:", error.response); // <- ¡Y esto!
      if (error.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Acceso denegado",
          text: error.response.data.mensaje || "Usuario o contraseña incorrectos",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error del servidor",
          text: "Intente nuevamente más tarde",
        });
      }
    }

  };

  return (
    <div className="container">
      <center>
        <img src={lockImg} alt="Lock" /><br />
        <h4>Demo</h4>
      </center>

      <form className="form-signin" onSubmit={handleSubmit}>
        <h2 className="form-signin-heading">Ingreso al sistema</h2>

        <label htmlFor="user" className="sr-only">Nombre de usuario</label>
        <input
          type="text"
          id="user"
          name="user"
          className="form-control"
          placeholder="Escriba nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />

        <label htmlFor="pass" className="sr-only">Password</label>
        <input
          type="password"
          id="pass"
          name="pass"
          className="form-control"
          placeholder="Escriba su password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
