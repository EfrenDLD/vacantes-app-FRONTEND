import { Link, useNavigate } from "react-router-dom";

export const NavVisitante = () => {
    const navigate = useNavigate();

    return (
        <div className="container ">
            <div className="d-flex align-items-top">
            </div>
            <div className="row">
                <div className="col">
                    <h3 className="text-start">My Company </h3>
                </div>
            </div>
            <div className="row bg-light mt-2 rounded-2">
                <div className="col-4">
                    <button
                        className="btn w-100"
                        onClick={() => navigate("/")}
                    >
                        Inicio
                    </button>
                </div>
                <div className="col-4">
                    <button
                        className="btn w-100"
                        onClick={() => navigate("/login")}
                    >
                        Administracion
                    </button>
                </div>
                <div className="col-4">
                    <button
                        className="btn w-100"
                        onClick={() => navigate("/acerca")}
                    >
                        Acerca de
                    </button>
                </div>
            </div>
        </div>
    );
};
