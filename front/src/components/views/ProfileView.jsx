import { BookCard } from '../common/BookCard';
import { FormularioLibro } from './FormularioLibro';

export function ProfileView({ misLibros, onLibroAgregado }) {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Mis libros</h2>

      <FormularioLibro onLibroAgregado={onLibroAgregado} />

      <h3 style={{ marginTop: '2rem' }}>Libros que has ofrecido</h3>
      {misLibros.length === 0 ? (
        <p>Aún no has publicado ningún libro. Usa el formulario de arriba para compartir el primero.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {misLibros.map((libro) => (
            <BookCard
              key={libro.id}
              libro={libro}
              actionLabel="Gestionar Libro"
              onAction={(item) => alert(`Gestionando: ${item.titulo}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}