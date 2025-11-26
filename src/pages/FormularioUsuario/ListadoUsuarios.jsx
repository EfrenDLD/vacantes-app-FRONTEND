import { useEffect, useState } from "react";
import usuarioService from "../../service/UsuarioService";

export const ListaUsuarios = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const data = await usuarioService.getAll();
            setUsuarios(data);   
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <p>Cargando usuarios...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h5 className="mb-0">Lista de Usuarios</h5>
                </div>

                <div className="card-body p-0">
                    {usuarios.length === 0 ? (
                        <p className="p-3 text-center mb-0">No se encontraron usuarios.</p>
                    ) : (
                        <table className="table table-striped mb-0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
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
                    )}
                </div>

            </div>
        </div>
    );
};
