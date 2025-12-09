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

    // Estado para los errores de validación
    const [errors, setErrors] = useState({
        nombre: "",
        email: "",
        username: "",
        contrasenia: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Limpiar el error del campo cuando el usuario empiece a escribir
        if (value.trim() !== "") {
            setErrors({ ...errors, [name]: "" });
        }
    };

    // validar el formulario
    const validarFormulario = () => {
        const nuevosErrores = {
            nombre: "",
            email: "",
            username: "",
            contrasenia: ""
        };

        let esValido = true;

        // Validar nombre
        if (form.nombre.trim() === "") {
            nuevosErrores.nombre = "El nombre es obligatorio";
            esValido = false;
        }

        // Validar email
        if (form.email.trim() === "") {
            nuevosErrores.email = "El email es obligatorio";
            esValido = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            nuevosErrores.email = "El formato del email no es válido";
            esValido = false;
        }

        // Validar username
        if (form.username.trim() === "") {
            nuevosErrores.username = "El usuario es obligatorio";
            esValido = false;
        }

        // Validar contraseña
        if (form.contrasenia.trim() === "") {
            nuevosErrores.contrasenia = "La contraseña es obligatoria";
            esValido = false;
        } else if (form.contrasenia.length < 6) {
            nuevosErrores.contrasenia = "La contraseña debe tener al menos 6 caracteres";
            esValido = false;
        }

        setErrors(nuevosErrores);
        return esValido;
    };


    const handleSubmit = async () => {

        // Validar antes de enviar
        if (!validarFormulario()) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor complete todos los campos obligatorios",
                confirmButtonColor: "#6c757d"
            });
            return;
        }

        try {
            console.log("Payload enviado:", form);

            await usuarioService.create(form);

            Swal.fire({
                icon: "success",
                title: "Usuario creado correctamente",
                timer: 1500,
                showConfirmButton: false
            });

            // Limpiar el formulario después de guardar
            setForm({
                nombre: "",
                email: "",
                username: "",
                contrasenia: "",
                perfil: "ADMIN",
                estatus: "ACTIVO"
            });

            // Limpiar errores
            setErrors({
                nombre: "",
                email: "",
                username: "",
                contrasenia: ""
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
            <NavAdmin />

            <div className="d-flex justify-content-center">
                <div className="col-12 card border-secondary w-50 mt-5 text-start">

                    <div className="card-header bg-light">
                        <h5 className="card-title">Crear Usuario</h5>
                    </div>

                    <div className="card-body">
                        <div>

                            {/* Campo Nombre */}
                            <div className="mb-3">
                                <label className="form-label fw-bolder">
                                    Nombre <span className="text-danger">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                    name="nombre" 
                                    value={form.nombre}
                                    onChange={handleChange}
                                />
                                {errors.nombre && (
                                    <div className="invalid-feedback d-block">
                                        {errors.nombre}
                                    </div>
                                )}
                            </div>

                            {/* Campo Email */}
                            <div className="mb-3">
                                <label className="form-label fw-bolder">
                                    Email <span className="text-danger">*</span>
                                </label>
                                <input 
                                    type="email" 
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    name="email" 
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback d-block">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            {/* Campo Usuario */}
                            <div className="mb-3">
                                <label className="form-label fw-bolder">
                                    Usuario <span className="text-danger">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                    name="username" 
                                    value={form.username}
                                    onChange={handleChange}
                                />
                                {errors.username && (
                                    <div className="invalid-feedback d-block">
                                        {errors.username}
                                    </div>
                                )}
                            </div>

                            {/* Campo Contraseña */}
                            <div className="mb-3">
                                <label className="form-label fw-bolder">
                                    Contraseña <span className="text-danger">*</span>
                                </label>
                                <input 
                                    type="password" 
                                    className={`form-control ${errors.contrasenia ? 'is-invalid' : ''}`}
                                    name="contrasenia" 
                                    value={form.contrasenia}
                                    onChange={handleChange}
                                />
                                {errors.contrasenia && (
                                    <div className="invalid-feedback d-block">
                                        {errors.contrasenia}
                                    </div>
                                )}
                            </div>

                            {/* Campo Estatus */}
                            <div className="mb-3">
                                <label className="form-label fw-bolder">Estatus</label>
                                <select 
                                    className="form-select" 
                                    name="estatus" 
                                    value={form.estatus}
                                    onChange={handleChange}
                                >
                                    <option value="ACTIVO">ACTIVO</option>
                                    <option value="INACTIVO">INACTIVO</option>
                                </select>
                            </div>

                            <button className="btn btn-secondary" type="button" onClick={handleSubmit}>
                                Guardar
                            </button>

                        </div>
                    </div>

                </div>
            </div>

            <ListaUsuarios />

        </div>
    );
};
