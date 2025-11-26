import { NavAdmin } from "../../components/NavAdmin/NavAdmin";
import { ListaUsuarios } from "./ListadoUsuarios"; 

export const FormularioUsuario = () => {

    return (
        <div className="w-100">
            <NavAdmin />

            <div className="d-flex justify-content-center">
                <div className="col-12 card border-secondary w-50 mt-5 text-start">

                    <div className="card-header bg-light">
                        <h5 className="card-title">Crear Usuario</h5>
                    </div>

                    <div className="card-body">
                        <form>

                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label fw-bolder">
                                    Nombre de usuario
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Escriba el nombre del usuario"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-bolder">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Escriba la contraseña"
                                />
                            </div>

                            <button className="btn btn-secondary" type="button">
                                Guardar
                            </button>

                        </form>
                    </div>

                </div>
            </div>
            
            <ListaUsuarios />

        </div>
    );
};
