import { useState } from 'react';
import { registrarLibro } from '../../services/api';

export function FormularioLibro({ onLibroAgregado }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('Ingeniería');
  const [mensajeError, setMensajeError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError(null);

    try {
      const nuevo = await registrarLibro({ titulo, autor, categoria });
      alert('¡Libro registrado exitosamente!');
      onLibroAgregado(nuevo);
      setTitulo('');
      setAutor('');
    } catch (err) {
      // Captura el Error 400 que responde la API de Jhon
      setMensajeError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '350px', padding: '1rem' }}>
      <h3>Compartir un Libro</h3>

      {mensajeError && (
        <div style={{ background: '#ffebee', color: '#c62828', padding: '0.5rem', borderRadius: '4px' }}>
          ⚠️ {mensajeError}
        </div>
      )}

      <input
        type="text"
        placeholder="Título del libro"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      />

      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="Ingeniería">Ingeniería</option>
        <option value="Derecho">Derecho</option>
        <option value="Administración">Administración</option>
      </select>

      <button type="submit">Publicar en el Catálogo</button>
    </form>
  );
}