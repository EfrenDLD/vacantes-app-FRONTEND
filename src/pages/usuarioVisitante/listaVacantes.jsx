import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialVacantes = [
  { id: '1', titulo: 'Nombre vacante 1', publicado: '2025-10-30' },
  { id: '2', titulo: 'Nombre vacante 2', publicado: '2025-10-25' },
  { id: '3', titulo: 'Nombre vacante 3', publicado: '2025-10-20' },
];

export default function ListaVacantes() {
  const [query, setQuery] = useState('');
  const [vacantes, setVacantes] = useState(initialVacantes);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    setVacantes(q ? initialVacantes.filter(v => v.titulo.toLowerCase().includes(q)) : initialVacantes);
  };

  const handleEliminar = (id) => {
    setVacantes(vacantes.filter(v => v.id !== id));
  };

  return (
    <div className="container">
      <div className="masthead">
        <h3 className="text-muted">My Company</h3>
        <nav>
          <ul className="nav nav-justified">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#admin">Administración</a></li>
            <li><a href="#acerca">Acerca</a></li>
          </ul>
        </nav>
      </div>

      <form className="navbar-form navbar-right" onSubmit={handleSearch}>
        <div className="form-group">
          <input
            type="text"
            name="query"
            required
            placeholder="Buscar oferta..."
            className="form-control"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">Buscar</button>
      </form>

      <br /><br /><br />

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title"><b>Lista de Vacantes</b></h3>
        </div>
        <div className="panel-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="left">ID</th>
                <th>Vacante</th>
                <th>Publicado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vacantes.map(v => (
                <tr key={v.id}>
                  <td className="left">{v.id}</td>
                  <td>{v.titulo}</td>
                  <td>{v.publicado}</td>
                  <td>
                    <button className="btn btn-default" onClick={() => alert('Ver detalles: ' + v.id)}>Ver Detalles</button>{' '}
                    <button className="btn btn-default" onClick={() => handleEliminar(v.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2016 My Company, Inc.</p>
      </footer>
    </div>
  );
}