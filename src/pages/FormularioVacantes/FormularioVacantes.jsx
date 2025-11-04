import { useState } from "react";
import Swal from 'sweetalert2'
import { NavAdmin } from "../../components/NavAdmin/NavAdmin";
import RadioSelect from "../../components/RadioSelect/RadioSelect";
import { soloLetras } from "../../utils/Validaciones/Validaciones";

export const FormularioVacante = ({ guardarVacante }) => {
    // ********************************** DEFINICION DE VARIABLES  *****************************************
    const [errores, setErrores] = useState()

    // *******************************  INICIALIZANDO LOS FORMULARIOS **************************************
    const formularioInicialVacantes = {
        fechaPublicacion: new Date().toISOString().split('T')[0],
        nombre: "",
        descripcion: "",
        detalle: "",
        activo: ""
    }

    const [datosFormularioVacantes, setDatosFormularioVacantes] = useState(formularioInicialVacantes);

    // **********************************  OBTENER DATOS DE LA BD  *****************************************
    // ********************************** USE EFFECTS **********************************
    // **********************************  MANEJADORES DE CAMBIOS  *****************************************
    const actualizarCamposVacante = (e) => {
        const { name, value } = e.target;
        const camposBoleanos = ["activo"]

        if (camposBoleanos.includes(name)) {
            setDatosFormularioVacantes((prevData) => ({
                ...prevData,
                [name]: siNoToBool(value)
            }));
        } else {
            setDatosFormularioVacantes((prevData) => ({
                ...prevData,
                [name]: value
            }))
        }

    }

    // ******************************* FUNCIONES GENERALES *******************************************
    const boolToSiNo = (valor) => valor === true ? 'Si' : valor === false ? 'No' : '';
    const siNoToBool = (valor) => valor === 'Si' ? true : valor === 'No' ? false : null;

    // ********************  SE ENVIAN LOS DATOS DEL FORMULARIO PARA SER GUARDADOS  ************************
    const guardarVacantes = async (e) => {
        e.preventDefault();
        if (validarCampos("vacantes") === 0)
            return
        try {
            const vacantesGuardar = {
                ...datosFormularioVacantes,
                usuario: '1'
            }
            const respuesta = await guardarVacante(vacantesGuardar)
            if (respuesta.ok == false) {
                if(!respuesta.errores.response)
                    mostrarError("Error de conexion. Inténtalo más tarde.")
                else
                    mostrarError(respuesta.errores)
                return
            }

            setErrores({})
            setDatosFormularioVacantes(formularioInicialVacantes)
            mostrarExito("Vacante agregado con exito.")
        } catch (error) {
            console.log("Ocurrio un error al guardar los datos: ", error)
        }
    }

    // ***********************************  VALIDACION DE CAMPOS  ******************************************
    const validarCampos = (formulario) => {
        const erroresTemporales = {}

        if (formulario == "vacantes") {
            Object.keys(datosFormularioVacantes).forEach((campo) => {
                if (datosFormularioVacantes[campo] === null || datosFormularioVacantes[campo] === undefined || datosFormularioVacantes[campo] === '') {
                    erroresTemporales[campo] = 'Este campo es obligatorio';
                }

            })
        }

        if (Object.keys(erroresTemporales).length > 0) {
            setErrores(erroresTemporales);
            mostrarCuidado("Tienes que llenar todos los campos requeridos")
            return 0;
        }

        return 1;
    }
    
    // **************************  FUNCIONES PARA MOSTRAR MENSAJES AL USUARIO  *****************************
    const mostrarAlerta = (config) => {
        return Swal.fire({
            ...config,
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                const confirmButton = Swal.getConfirmButton();
            },
        });
    };

    const mostrarError = (mensajeHTML) => {
        mostrarAlerta({
            title: 'Error',
            html: mensajeHTML,
            icon: 'error',
            confirmButtonText: 'Aceptar',
        });
    };

    const mostrarCuidado = (mensaje) => {
        mostrarAlerta({
            title: '!Alerta!',
            text: mensaje,
            icon: 'warning',
            confirmButtonText: 'Aceptar',
        });
    };

    const mostrarExito = (mensaje) => {
        mostrarAlerta({
            title: 'Éxito',
            text: mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar',
        }).then(() => {
            navigate('/menuSolicitar')
        });
    };

    const mostrarInformacion = (mensaje) => {
        mostrarAlerta({
            title: 'Periodo de registro cerrado',
            text: mensaje,
            icon: 'info',
            confirmButtonText: 'Entendido',
        });
    };

    return (
        <div className="w-100">
            <NavAdmin />
            <div className="d-flex justify-content-center">
                <div className="col-12 card border-secondary w-75 mt-5 text-start">
                    <div className="card-header bg-light">
                        <h5 className="card-title">Crear Vacante</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={guardarVacantes}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label fw-bolder">
                                    Nombre
                                </label>
                                <input
                                    onBeforeInput={soloLetras}
                                    maxLength={46}
                                    minLength={8}
                                    type="text"
                                    className={`form-control ${errores?.nombre ? 'input-error' : ''}`}
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Escriba el nombre la vacante"
                                    value={datosFormularioVacantes?.nombre}
                                    onChange={actualizarCamposVacante}
                                />
                                {errores?.nombre && <div style={{ color: 'red' }}>{errores?.nombre}</div>}

                            </div>

                            <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label fw-bolder">
                                    Descripción
                                </label>
                                <textarea
                                    maxLength={150}
                                    minLength={8}
                                    className={`form-control ${errores?.descripcion ? 'input-error' : ''}`}
                                    id="descripcion"
                                    name="descripcion"
                                    rows="3"
                                    placeholder="Escribe una descripción de la vacante"
                                    value={datosFormularioVacantes?.descripcion}
                                    onChange={actualizarCamposVacante}
                                ></textarea>
                                {errores?.descripcion && <div style={{ color: 'red' }}>{errores?.descripcion}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="detalle" className="form-label fw-bolder">
                                    Escriba los detalles
                                </label>
                                <textarea
                                    maxLength={150}
                                    minLength={8}
                                    className={`form-control ${errores?.detalle ? 'input-error' : ''}`}
                                    id="detalle"
                                    name="detalle"
                                    rows="4"
                                    placeholder="Escriba los detalles de la vacante"
                                    value={datosFormularioVacantes?.detalle}
                                    onChange={actualizarCamposVacante}
                                ></textarea>
                                {errores?.detalle && <div style={{ color: 'red' }}>{errores?.detalle}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="fw-bolder">Activo:</label>
                                <RadioSelect
                                    options={["Si", "No"]}
                                    name="activo"
                                    onChange={actualizarCamposVacante}
                                    value={boolToSiNo(datosFormularioVacantes?.activo)}
                                />
                                {errores?.activo && <div style={{ color: 'red' }}>{errores?.activo}</div>}
                            </div>

                            <button className="btn btn-secondary">
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
