import { NavAdmin } from "../../components/NavAdmin/NavAdmin";
import { ListaUsuarios } from "./ListadoUsuarios"; 

// Componente principal para crear un usuario.
// Aquí se podrían agregar funciones de validación, edición y manejo de formulario.
export const FormularioUsuario = () => {

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
                                {/* Aquí se podría agregar:
                                    - Validación del nombre
                                    - Indicador si ya existe un usuario con ese nombre */}
                            </div>

                            {/* Campo para la contraseña */}
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
                                {/* Aquí se podría agregar:
                                    - Ojo para mostrar/ocultar contraseña
                                    - Validación de fortaleza de contraseña
                                    - Confirmación de contraseña */}
                            </div>

                            {/* Botón para guardar el usuario.
                               Aquí se puede agregar una función onClick para enviar datos al backend. */}
                            <button className="btn btn-secondary" type="button">
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
            
            {/* Listado de usuarios que ya existen.
               Aquí se podrían agregar funciones como editar, eliminar o buscar usuarios. */}
            <ListaUsuarios />

        </div>
    );
};
