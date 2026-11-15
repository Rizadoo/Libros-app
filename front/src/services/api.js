const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function obtenerLibros(categoria = '') {
  const url = categoria && categoria !== 'all'
    ? `${BASE_URL}/libros?categoria=${categoria}`
    : `${BASE_URL}/libros`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al cargar libros');
  return res.json();
}

export async function obtenerResumen() {
  const res = await fetch(`${BASE_URL}/libros/resumen`);
  if (!res.ok) throw new Error('Error al cargar resumen');
  return res.json();
}

export async function registrarLibro(datosLibro) {
  const res = await fetch(`${BASE_URL}/libros`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosLibro)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al guardar el libro');
  return data;
}