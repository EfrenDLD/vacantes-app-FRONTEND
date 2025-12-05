import Swal from "sweetalert2";
import { NavAdmin } from "../../components/NavAdmin/NavAdmin";
import { ListaUsuarios } from "./ListadoUsuarios";
import { useState } from "react";
import usuarioService from "../../service/UsuarioService";

// Componente principal para crear un usuario.
// Aquí se podrían agregar funciones de validación, edición y manejo de formulario.
export const FormularioUsuario = () => {

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        username: "",
        contrasenia: "",  // ✔ correcto
        perfil: "ADMIN",
        estatus: "ACTIVO"
    });


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            console.log("Payload enviado:", form);

            await usuarioService.create(form);

            Swal.fire({
                icon: "success",
                title: "Usuario creado correctamente",
                timer: 1500,
                showConfirmButton: false
            });

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al crear usuario",
                text: error.response?.data || "Revise los datos"
            });
        }
    };

    return (
        <div className="w-100">

            {/* Barra de navegación del administrador */}
            <NavAdmin />

            <div className="d-flex justify-content-center">
                <div className="col-12 card border-secondary w-50 mt-5 text-start">

                    <div className="card-header bg-light">
                        <h5 className="card-title">Crear Usuario</h5>
                    </div>

                    <div className="card-body">

                        {/* Formulario para registrar un usuario.
                           Aquí se pueden conectar funciones como onChange, validaciones o envío al backend. */}
                        <form>

                            {/* Campo para el nombre del usuario */}
                            <div className="mb-3">
                                <label className="form-label fw-bolder">Nombre</label>
                                <input type="text" className="form-control" name="nombre" onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bolder">Email</label>
                                <input type="email" className="form-control" name="email" onChange={handleChange} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bolder">Usuario</label>
                                <input type="text" className="form-control" name="username" onChange={handleChange} />
                            </div>

                            {/* Campo para la contraseña */}
                            <div className="mb-3">
                                <label className="form-label fw-bolder">Contraseña</label>
                                <input type="password" className="form-control" name="contrasenia" onChange={handleChange} />
                            </div>

                            {/* Perfil ya no se muestra, pero se envía como ADMIN automáticamente */}

                            <div className="mb-3">
                                <label className="form-label fw-bolder">Estatus</label>
                                <select className="form-select" name="estatus" onChange={handleChange}>
                                    <option value="ACTIVO">ACTIVO</option>
                                    <option value="INACTIVO">INACTIVO</option>
                                </select>
                            </div>

                            <button className="btn btn-secondary" type="button" onClick={handleSubmit}>
                                Guardar
                            </button>

                            {/* Aquí podría agregarse:
                                - Botón de limpiar formulario
                                - Botón de cancelar y regresar
                                - Indicador de carga mientras se guarda */}
                        </form>
                    </div>

                </div>
            </div>

            <ListaUsuarios />

        </div>
    );
};
