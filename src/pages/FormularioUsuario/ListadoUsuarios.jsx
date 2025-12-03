import { useEffect, useState } from "react";
import usuarioService from "../../service/UsuarioService";
import Swal from "sweetalert2";

export const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        username: "",
        perfil: "",
        estatus: "",
        contrasenia: ""
    });

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

    const handleEditar = (usuario) => {
        setUsuarioEditando(usuario);
        setFormData({
            nombre: usuario.nombre || "",
            email: usuario.email || "",
            username: usuario.username || "",
            perfil: usuario.perfil || "",
            estatus: usuario.estatus || "",
            contrasenia: "" // Dejar vacío para no mostrar la contraseña actual
        });
        setShowModal(true);
    };

    const handleGuardarEdicion = async () => {
        if (!formData.nombre || !formData.email || !formData.username || !formData.perfil || !formData.estatus) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor complete todos los campos obligatorios.",
            });
            return;
        }

        // Preparar datos para enviar (excluir contraseña si está vacía)
        const dataToSend = { ...formData };
        if (!dataToSend.contrasenia) {
            delete dataToSend.contrasenia;
        }

        try {
            await usuarioService.update(usuarioEditando.id, dataToSend);
            setShowModal(false);
            cargarUsuarios();
            Swal.fire({
                icon: "success",
                title: "Usuario actualizado correctamente.",
                timer: 1800,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            Swal.fire({
                icon: "error",
                title: "No se pudo actualizar el usuario",
            });
        }
    };

    const handleEliminar = async (id) => {
        const confirmacion = await Swal.fire({
            title: "¿Eliminar usuario?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        });

        if (confirmacion.isConfirmed) {
            try {
                await usuarioService.deleteById(id);
                cargarUsuarios();
                Swal.fire({
                    icon: "success",
                    title: "Usuario eliminado correctamente.",
                    timer: 1800,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                Swal.fire({
                    icon: "error",
                    title: "No se pudo eliminar el usuario",
                });
            }
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
                                                onClick={() => handleEditar(u)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                style={{ padding: "3px 8px" }}
                                                type="button"
                                                onClick={() => handleEliminar(u.id)}
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

            {/* Modal de edición */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Usuario</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="perfil" className="form-label">Perfil</label>
                                <select
                                    className="form-control"
                                    id="perfil"
                                    value={formData.perfil}
                                    onChange={(e) => setFormData({ ...formData, perfil: e.target.value })}
                                >
                                    <option value="">Seleccionar perfil</option>
                                    <option value="admin">Admin</option>
                                    <option value="visitante">Visitante</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="estatus" className="form-label">Estatus</label>
                                <select
                                    className="form-control"
                                    id="estatus"
                                    value={formData.estatus}
                                    onChange={(e) => setFormData({ ...formData, estatus: e.target.value })}
                                >
                                    <option value="">Seleccionar estatus</option>
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contrasenia" className="form-label">Contraseña (opcional, dejar vacío para no cambiar)</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="contrasenia"
                                    value={formData.contrasenia}
                                    onChange={(e) => setFormData({ ...formData, contrasenia: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={handleGuardarEdicion}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};