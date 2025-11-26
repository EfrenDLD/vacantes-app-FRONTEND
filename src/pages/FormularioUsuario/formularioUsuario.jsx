import { NavAdmin } from "../../components/NavAdmin/NavAdmin";
import { useState } from "react";

export const FormularioUsuario = () => {

    // Lista estática
    const [usuarios] = useState([
        { id: 1, nombre: "Carlos" },
        { id: 2, nombre: "María" },
        { id: 3, nombre: "Luis" }
    ]);

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

            {/* LISTA DE USUARIOS */}
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Lista de Usuarios</h5>
                    </div>

                    <div className="card-body p-0">
                        <table className="table table-striped mb-0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    
                                </tr>
                            </thead>

                            <tbody>
                                {usuarios.map((u) => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.nombre}</td>
                                        <td className="text-nowrap" style={{ width: "150px" }}>
                                            <button
                                                className="btn btn-primary btn-sm me-1"
                                                style={{ padding: "3px 8px" }}
                                                type="button"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                style={{ padding: "3px 8px" }}
                                                type="button"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
    );
};
