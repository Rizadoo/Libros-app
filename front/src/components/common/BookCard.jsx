export function BookCard({ libro, actionLabel = "Ver Detalle", onAction }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', background: '#fff' }}>
      <img
        src={libro.portadaUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"}
        alt={libro.titulo}
        style={{ width: '100%', height: '170px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <div style={{ marginTop: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: libro.disponible ? '#2e7d32' : '#c62828' }}>
          {libro.disponible ? '• Disponible' : '• Prestado'}
        </span>
        <h3 style={{ fontSize: '1rem', margin: '0.4rem 0' }}>{libro.titulo}</h3>
        <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>Por {libro.autor}</p>
        <small style={{ color: '#888' }}>{libro.categoria} • {libro.edicion}</small>
      </div>

      <button
        onClick={() => onAction && onAction(libro)}
        disabled={!libro.disponible && actionLabel === "Solicitar Préstamo"}
        style={{ marginTop: '0.75rem', width: '100%', padding: '0.5rem', cursor: 'pointer' }}
      >
        {actionLabel}
      </button>
    </div>
  );
}