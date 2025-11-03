import { useState } from "react";
import { NavAdmin } from "../../components/NavAdmin/NavAdmin";
import RadioSelect from "../../components/RadioSelect/RadioSelect";

export const FormularioVacante = ({ guardarVacante }) => {
    // ********************************** DEFINICION DE VARIABLES  *****************************************
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

        try {
            console.log("Datos a enviar: ", datosFormularioVacantes)
            const respuesta = await guardarVacante(datosFormularioVacantes)
            if(respuesta.ok == false) {
                console.log("Error back: ", respuesta.errores)
            }
        } catch (error) {
            console.log("Ocurrio un error al guardar los datos: ", error)
        }
    }
    // ***********************************  VALIDACION DE CAMPOS  ******************************************
    // **************************  FUNCIONES PARA MOSTRAR MENSAJES AL USUARIO  *****************************

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
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Escriba el nombre la vacante"
                                    value={datosFormularioVacantes.nombre}
                                    onChange={actualizarCamposVacante}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label fw-bolder">
                                    Descripción
                                </label>
                                <textarea
                                    className="form-control"
                                    id="descripcion"
                                    name="descripcion"
                                    rows="3"
                                    placeholder="Escribe una descripción de la vacante"
                                    value={datosFormularioVacantes.descripcion}
                                    onChange={actualizarCamposVacante}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="detalle" className="form-label fw-bolder">
                                    Escriba los detalles
                                </label>
                                <textarea
                                    className="form-control"
                                    id="detalle"
                                    name="detalle"
                                    rows="4"
                                    placeholder="Escriba los detalles de la vacante"
                                    value={datosFormularioVacantes.detalle}
                                    onChange={actualizarCamposVacante}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="fw-bolder">Estado:</label>
                                <RadioSelect
                                    options={["Si", "No"]}
                                    name="activo"
                                    onChange={actualizarCamposVacante}
                                    value={boolToSiNo(datosFormularioVacantes.activo)}
                                />

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
