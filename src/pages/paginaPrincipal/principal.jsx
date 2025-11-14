import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { NavAdmin } from '../../components/NavAdmin/NavAdmin';
import vacanteService from '../../service/VacanteService';

export default function Principal() {
  const [vacantes, setVacantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // estado para la búsqueda (valor del input)
  const [searchTerm, setSearchTerm] = useState('');

  // Obtener y guardar las 3 vacantes más recientes
  useEffect(() => {
    const fetchRecientes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await vacanteService.getActivas(); // asume response.data es array de vacantes
        const data = response.data ?? response;
        const recientes = (data || [])
          .slice()
          .sort((a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime())
          .slice(0, 3);
        setVacantes(recientes);
      } catch (err) {
        console.error('Error al cargar vacantes:', err);
        setError('No se pudieron cargar las vacantes.');
        setVacantes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecientes();
  }, []);

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return '';
    try {
      return new Date(fechaStr).toLocaleDateString('es-MX');
    } catch {
      return fechaStr;
    }
  };

  // Filtrar las 3 vacantes recientes por el término de búsqueda (si hay)
  const visibleVacantes = searchTerm.trim()
    ? vacantes.filter(v =>
        (v.nombre ?? v.titulo ?? '').toLowerCase().includes(searchTerm.trim().toLowerCase())
      )
    : vacantes;

  const handleSearch = (e) => {
    e.preventDefault();
    // la búsqueda se aplica en tiempo real usando visibleVacantes; no hay más acción necesaria aquí
  };

  return (
    <div className="container">
      <div className="masthead">
        <NavAdmin />
      </div>

      {/* Buscador visual (controlado) */}
      <div className="d-flex justify-content-end mb-3">
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            type="text"
            name="query"
            placeholder="Buscar oferta..."
            className="form-control me-2"
            style={{ maxWidth: 300 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-success">Buscar</button>
        </form>
      </div>

      {/* Jumbotron */}
      <div className="bg-light p-5 rounded mb-4">
        <h2>¡ENCUENTRA TU TRABAJO IDEAL!</h2>
        <p className="lead text-justify">
          Bienvenido a My Company, aquí podrás encontrar ofertas de empleos que sean adecuados a tu perfil,<br />
          experiencia y ubicación. Es muy fácil de usar, solo haz clic en una vacante, ingresa para ver los detalles y<br />
          envíanos tu CV en formato PDF o DOCX. Nosotros revisaremos tu CV y posteriormente te contactaremos.
        </p>
        <p>
          <a className="btn btn-lg btn-success" href="/vacantes" role="button">Ver más Ofertas</a>
        </p>
      </div>

      <h1>Ofertas recientes</h1>

      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">{error}</div>
      ) : (
        <div className="row">
          {visibleVacantes.map(v => (
            <div className="col-lg-4 mb-4" key={v.id}>
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{v.nombre || v.titulo}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Fecha de publicación: {formatFecha(v.fechaPublicacion)}</h6>
                  <p className="card-text text-justify" style={{ flexGrow: 1 }}>
                    {v.descripcion || 'Sin descripción disponible.'}
                  </p>
                  <a href="#" className="btn btn-primary mt-2">Ver detalles &raquo;</a>
                  
                </div>
              </div>
            </div>
          ))}

          {/* Mensaje cuando no hay coincidencias en las 3 recientes */}
          {searchTerm.trim() !== '' && visibleVacantes.length === 0 && (
            <div className="col-12">
              <div className="alert alert-info">
                No se encontró una vacante reciente con ese nombre.
              </div>
            </div>
          )}

          {/* Mensaje cuando no hay vacantes recientes en general */}
          {searchTerm.trim() === '' && vacantes.length === 0 && (
            <div className="col-12">
              <div className="alert alert-info">No hay vacantes recientes para mostrar.</div>
            </div>
          )}
        </div>
      )}

      <footer className="footer mt-5">
        <p>&copy; 2016 My Company, Inc.</p>
      </footer>
    </div>
  );
}
