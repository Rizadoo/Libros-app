import { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { CatalogView } from './components/views/CatalogView';
import { DashboardView } from './components/views/DashboardView';
import { ProfileView } from './components/views/ProfileView';

// Una sola lista de vistas: el Navbar y el render salen de aqui (DRY).
const VISTAS = [
  { id: 'catalogo', etiqueta: 'Catálogo' },
  { id: 'dashboard', etiqueta: 'Resumen del campus' },
  { id: 'perfil', etiqueta: 'Mis libros' }
];

export default function App() {
  const [vista, setVista] = useState('catalogo');
  // La API no guarda quien publico cada libro, asi que "Mis libros"
  // son los que este usuario registra durante la sesion.
  const [misLibros, setMisLibros] = useState([]);

  const agregarMiLibro = (libro) => setMisLibros((previos) => [...previos, libro]);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '1100px', margin: '0 auto' }}>
      <Navbar vistas={VISTAS} vistaActiva={vista} onCambiar={setVista} />
      {vista === 'catalogo' && <CatalogView />}
      {vista === 'dashboard' && <DashboardView />}
      {vista === 'perfil' && (
        <ProfileView misLibros={misLibros} onLibroAgregado={agregarMiLibro} />
      )}
    </div>
  );
}