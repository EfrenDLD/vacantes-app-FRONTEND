import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Login/login.css";
import lockImg from "../assets/lock.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      setMensaje(data.mensaje);

      if (data.mensaje === "Login exitoso") {
        alert(`Bienvenido ${data.username}! Perfil: ${data.perfil}`);
        navigate("/formularioVacante");
      }

    } catch (error) {
      setMensaje("Error al conectar con el servidor");
      console.error("Error:", error);
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

        {mensaje && <p className="text-danger">{mensaje}</p>}
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
