import { useNavigate } from "react-router-dom";
import "./Error404.css";

export const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className="error-container">
            <h1 className="error-title">404</h1>
            <p className="error-message">
                Uy... parece que esta página decidió irse de vacaciones.
            </p>

            <div className="error-buttons">
                <button className="btn btn-primary" onClick={() => navigate("/principal")}>
                    Ir al inicio
                </button>

                <button className="btn btn-secondary" onClick={() => navigate("/login")}>
                    Volver al Login
                </button>
            </div>
        </div>
    );
};
