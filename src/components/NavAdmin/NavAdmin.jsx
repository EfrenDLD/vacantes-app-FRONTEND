import { useNavigate } from "react-router-dom";

export const NavAdmin = () => {
    const navigate = useNavigate();

    const handleSalir = () => {
        // Borrar sesión
        sessionStorage.clear();

        // Redirigir al login
        navigate("/login");
    };


    return (
        <div className="container ">
            <div className="d-flex align-items-top">
            </div>
            <div className="row">
                <div className="col">
                    <h3 className="text-start">My Company - Administración</h3>
                </div>
            </div>
            <div className="row bg-light mt-2 rounded-2">
                <div className="col-4">
                    <button
                        className="btn w-100"
                        onClick={() => navigate("/formularioVacante")}
                    >
                        Crear Vacante
                    </button>
                </div>
                <div className="col-4">
                    <button
                        className="btn w-100"
                        onClick={() => navigate("/listarVacantesAdministrador")}
                    >
                        Vacantes
                    </button>
                </div>
                <div className="col-4">
                    <button
                        className="btn w-100"
                        onClick={handleSalir}
                    >
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
};