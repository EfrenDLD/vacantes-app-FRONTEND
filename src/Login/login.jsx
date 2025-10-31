import React from "react";
import "../css/bootstrap.min.css";
import "../css/signin.css";
import lockImg from "../assets/lock.png";

const Login = () => {
  return (
    <div className="container">
      <center>
        <img src={lockImg} alt="Lock" /><br />
        <h4>Demo</h4>
      </center>

      <form className="form-signin" method="post" action="#">
        <h2 className="form-signin-heading">Ingreso al sistema</h2>

        <label htmlFor="user" className="sr-only">Nombre de usuario</label>
        <input
          type="text"
          id="user"
          name="user"
          className="form-control"
          placeholder="Escriba nombre de usuario"
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
          required
        />

        <p className="text-danger">Mensaje - Error</p>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
