import { useState, useEffect } from 'react';
import { obtenerLibros, obtenerResumen } from '../../services/api';
import { BookCard } from '../common/BookCard';

// Cuantas novedades se muestran. Constante con nombre, no numero suelto.
const NOVEDADES_A_MOSTRAR = 3;

export function DashboardView() {
  const [resumen, setResumen] = useState(null);
  const [novedades, setNovedades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([obtenerResumen(), obtenerLibros()])
      .then(([datosResumen, libros]) => {
        setResumen(datosResumen);
        setNovedades(libros.slice(-NOVEDADES_A_MOSTRAR));
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p style={{ padding: '1rem' }}>Cargando resumen desde la API...</p>;
  if (error) return <p style={{ padding: '1rem', color: '#c62828' }}>⚠️ {error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Resumen del campus</h2>
      {/* El porcentaje lo calcula el back: el front solo lo muestra. */}
      <p>
        Total: <strong>{resumen.total}</strong> · Disponibles:{' '}
        <strong>{resumen.disponibles}</strong> · Prestados:{' '}
        <strong>{resumen.prestados}</strong> · Disponibilidad:{' '}
        <strong>{resumen.porcentajeDisponibilidad}%</strong>
      </p>

      <h3>Novedades</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {novedades.map((libro) => (
          <BookCard
            key={libro.id}
            libro={libro}
            actionLabel="Explorar Novedad"
            onAction={(item) => alert(`Explorando: ${item.titulo}`)}
          />
        ))}
      </div>
    </div>
  );
}