import { useState, useEffect } from 'react';
import { obtenerLibros } from '../../services/api';
import { BookCard } from '../common/BookCard';

export function CatalogView() {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerLibros()
      .then(datos => setLibros(datos))
      .catch(err => console.error(err))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p>Cargando catálogo CUC desde la API...</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem', padding: '1rem' }}>
      {libros.map((libro) => (
        <BookCard
          key={libro.id}
          libro={libro}
          actionLabel="Solicitar Préstamo"
          onAction={(item) => alert(`Solicitaste: ${item.titulo}`)}
        />
      ))}
    </div>
  );
}