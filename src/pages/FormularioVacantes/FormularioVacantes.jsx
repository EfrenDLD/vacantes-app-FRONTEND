export const FormularioVacante = () => {
    return (
        <div className="w-100">
            <div className="col-12 card border-secondary w-100 m-0">
                <div className="card-header bg-light">
                    <h5 className="card-title">Crear Vacante</h5>
                </div>
                <div className="card-body">
                    <form>
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
                                required
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
                                required
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
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-secondary">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
