export function Navbar({ vistas, vistaActiva, onCambiar }) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        borderBottom: '2px solid #b71c1c'
      }}
    >
      <strong style={{ marginRight: 'auto', color: '#b71c1c' }}>
        Intercambio Académico CUC
      </strong>
      {vistas.map((v) => (
        <button
          key={v.id}
          onClick={() => onCambiar(v.id)}
          aria-current={v.id === vistaActiva ? 'page' : undefined}
          style={{
            padding: '0.4rem 0.8rem',
            cursor: 'pointer',
            fontWeight: v.id === vistaActiva ? 'bold' : 'normal',
            background: v.id === vistaActiva ? '#b71c1c' : '#fff',
            color: v.id === vistaActiva ? '#fff' : '#333',
            border: '1px solid #b71c1c',
            borderRadius: '4px'
          }}
        >
          {v.etiqueta}
        </button>
      ))}
    </nav>
  );
}