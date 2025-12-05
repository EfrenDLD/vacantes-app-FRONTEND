import { useEffect, useState } from "react";
import usuarioService from "../../service/UsuarioService";

export const ListaUsuarios = () => {

    // Estado donde se guardan los usuarios obtenidos del backend
    const [usuarios, setUsuarios] = useState([]);

    // Estado para mostrar mensaje de carga mientras se hace la petición
    const [loading, setLoading] = useState(true);

    // useEffect que se ejecuta al cargar el componente por primera vez
    useEffect(() => {
        cargarUsuarios();
        // Aquí también se podría agregar un intervalo para refrescar la lista cada cierto tiempo
    }, []);

    // Función que obtiene todos los usuarios desde el servicio
    const cargarUsuarios = async () => {
        try {
            const data = await usuarioService.getAll();

            // Se guarda la lista de usuarios recibida
            setUsuarios(data);   

            // Aquí se podrían aplicar filtros, ordenamientos o paginación
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    // Vista mientras la información se está cargando
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

                {/* Encabezado de la tabla */}
                <div className="card-header">
                    <h5 className="mb-0">Lista de Usuarios</h5>
                </div>

                <div className="card-body p-0">

                    {/* Verifica si hay usuarios. Si no hay, muestra mensaje. */}
                    {usuarios.length === 0 ? (
                        <p className="p-3 text-center mb-0">No se encontraron usuarios.</p>

                    ) : (

                        /* Tabla de usuarios */
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

                                            {/* Botón para editar. Aquí se puede agregar una función
                                               que abra un formulario con los datos del usuario. */}
                                            <button
                                                className="btn btn-primary btn-sm me-1"
                                                style={{ padding: "3px 8px" }}
                                                type="button"
                                                // onClick={() => handleEditar(u)}
                                            >
                                                Editar
                                            </button>

                                            {/* Botón para eliminar. Aquí se puede agregar una función
                                               que pida confirmación y llame a usuarioService.delete. */}
                                            <button
                                                className="btn btn-danger btn-sm"
                                                style={{ padding: "3px 8px" }}
                                                type="button"
                                                // onClick={() => handleEliminar(u.id)}
                                            >
                                                Eliminar
                                            </button>

                                            {/* Aquí se pueden agregar más acciones:
                                                - Ver detalle del usuario
                                                - Asignar roles
                                                - Cambiar contraseña */}
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
