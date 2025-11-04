import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { PaginacionVacantes } from "../../components/paginacionVacantes/paginacionVacantes";
import vacanteService from '../../service/VacanteService';

export default function ListaVacantes() {
  // ********************************** DEFINICION DE VARIABLES *****************************************
  const [query, setQuery] = useState('');
  const [vacantes, setVacantes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensajeSinResultados, setMensajeSinResultados] = useState('');

  const itemsPerPage = 6;

  // ********************************** OBTENER DATOS DE LA BD *****************************************
  //Cargar todas las vacantes al iniciar el componente
  const cargarVacantes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await vacanteService.getAll();
      setVacantes(response.data);
      setMensajeSinResultados('');
    } catch (err) {
      console.error('Error al cargar vacantes:', err);
      setError('Error al cargar las vacantes');
      setVacantes([]);
    } finally {
      setLoading(false);
    }
  };

  // ********************************** USE EFFECTS **********************************

  //cargar vacantes cuando se monta el componente
  useEffect(() => {
    cargarVacantes();
  }, []);

  // ********************************** MANEJADORES DE CAMBIOS *****************************************

  //Manejar cambio en el input de búsqueda
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    // Si el campo está vacío, recargar todas las vacantes
    if (e.target.value.trim() === '') {
      cargarVacantes();
      setMensajeSinResultados('');
    }
  };

  // ******************************* FUNCIONES GENERALES *******************************************
  // Realizar búsqueda de vacantes

  const handleSearch = async (e) => {
    e.preventDefault();

    const palabraClave = query.trim();

    // Si no hay palabra clave, cargar todas las vacantes
    if (palabraClave === '') {
      cargarVacantes();
      return;
    }

    setLoading(true);
    setError(null);
    setMensajeSinResultados('');

    try {
      const response = await vacanteService.buscar(palabraClave);

      // Escenario 2: Sin resultados
      if (response.data.length === 0) {
        setMensajeSinResultados('No se encontraron resultados para tu búsqueda.');
        setVacantes([]);
      } else {
        // Escenario 1 y 3: Búsqueda exitosa 
        setVacantes(response.data);
        setMensajeSinResultados('');
      }

      setCurrentPage(1); // Resetear a página 1 al buscar
    } catch (err) {
      console.error('Error al buscar vacantes:', err);
      setError('Error al realizar la búsqueda');
      setVacantes([]);
    } finally {
      setLoading(false);
    }
  };

  //Cambiar de pagina en la paginación
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //Ver detalles de una vacante
  const verDetalles = (id) => {
    // TODO: Implementar navegación a detalles
    alert('Ver detalles: ' + id);
  };

  // ***************************** CALCULOS DE PAGINACION *****************************
  const totalPages = Math.ceil(vacantes.length / itemsPerPage);
  const displayedVacantes = vacantes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ***************************** RENDERIZADO *****************************
  return (
    <div className="container-fluid py-3">
      {/* Formulario de búsqueda */}
      <div className="d-flex justify-content-end mb-3">
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            type="text"
            name="query"
            placeholder="Buscar oferta..."
            className="form-control me-2"
            style={{ maxWidth: 300 }}
            value={query}
            onChange={handleQueryChange}
            disabled={loading}
          />
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Tabla de vacantes */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            <b>Lista de Vacantes</b>
            {/*vacantes.length > 0 && (
              <span className="badge bg-secondary ms-2">
                {vacantes.length} vacante{vacantes.length !== 1 ? 's' : ''}
              </span>
            )*/}
          </h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Vacante</th>
                {/*<th>Descripción</th>*/}
                <th>Publicado</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : displayedVacantes.length > 0 ? (
                displayedVacantes.map(v => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td><strong>{v.nombre}</strong></td>
                    {/*<th>  <td>{v.descripcion || 'Sin descripción'}</td> </th>*/}
                    <td>{new Date(v.fechaPublicacion).toLocaleDateString('es-MX')}</td>
                    {/*<td>
                      <span className={`badge ${v.activo ? 'bg-success' : 'bg-secondary'}`}>
                        {v.activo ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>*/}
                    
                    <td>
                      <button
                        className="btn btn-sm btn-light border border-secondary text-dark"
                        onClick={() => verDetalles(v.id)}
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-3">
                    {/* Mensaje sin resultados */}
                    {mensajeSinResultados && (
                      <div className="alert alert-info" role="alert">
                        {mensajeSinResultados}
                      </div>
                    )}
                  </td>
                </tr>

              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <PaginacionVacantes
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}