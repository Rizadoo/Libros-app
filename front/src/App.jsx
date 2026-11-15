import { useState } from 'react';
import { CatalogView } from './components/views/CatalogView';
import { FormularioLibro } from './components/views/FormularioLibro';

export default function App() {
  const [version, setVersion] = useState(0);
  return (
    <>
      <FormularioLibro onLibroAgregado={() => setVersion(version + 1)} />
      <CatalogView key={version} />
    </>
  );
}