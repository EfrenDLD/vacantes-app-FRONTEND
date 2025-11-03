import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { PaginacionVacantes } from '../../components/paginacionVacantes/paginacionVacantes';

const initialVacantes = [
  { id: '1', titulo: 'Ingeniero de Software Senior (Backend)', publicado: '2025-10-15' },
  { id: '2', titulo: 'Desarrollador Frontend (React)', publicado: '2025-10-10' },
  { id: '3', titulo: 'Ingeniero DevOps', publicado: '2025-09-30' },
  { id: '4', titulo: 'Desarrollador Full Stack (React/Node)', publicado: '2025-10-01' },
  { id: '5', titulo: 'Ingeniero de Datos', publicado: '2025-09-25' },
  { id: '6', titulo: 'QA Automation Engineer', publicado: '2025-10-05' },
  { id: '7', titulo: 'Desarrollador Mobile (React Native)', publicado: '2025-10-12' },
  { id: '8', titulo: 'UX/UI Designer', publicado: '2025-10-08' },
];

export default function ListaVacantes() {
  const [query, setQuery] = useState('');
  const [vacantes, setVacantes] = useState(initialVacantes);
  const [paginaActual, setPaginaActual] = useState(1);
  const vacantesPorPagina = 6;

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    setVacantes(q ? initialVacantes.filter(v => v.titulo.toLowerCase().includes(q)) : initialVacantes);
    setPaginaActual(1);
  };

  const totalPaginas = Math.ceil(vacantes.length / vacantesPorPagina);
  const displayedVacantes = vacantes.slice((paginaActual - 1) * vacantesPorPagina, paginaActual * vacantesPorPagina);

  console.log('vacantes:', vacantes.length, 'displayedVacantes:', displayedVacantes.length, 'paginaActual:', paginaActual, 'totalPaginas:', totalPaginas);

  const handlePageChange = (newPage) => {
    console.log('Cambiando a página:', newPage);
    setPaginaActual(newPage);
  };

  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-end mb-3">
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            type="text"
            name="query"
            required
            placeholder="Buscar oferta..."
            className="form-control me-2"
            style={{ maxWidth: 300 }}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-success">Buscar</button>
        </form>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0"><b>Lista de Vacantes</b></h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Vacante</th>
                <th>Publicado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {displayedVacantes.map(v => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.titulo}</td>
                  <td>{v.publicado}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-light border border-secondary text-dark"
                      onClick={() => alert('Ver detalles: ' + v.id)}
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
              {displayedVacantes.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-3">No hay vacantes</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {totalPaginas > 1 && (
        <PaginacionVacantes
          currentPage={paginaActual}
          totalPages={totalPaginas}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}