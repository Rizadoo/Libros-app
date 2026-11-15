/**
 * Capa de Lógica de Negocio: Reglas para la plataforma de Libros CUC.
 *
 * REGLA DE ORO ARQUITECTURAL:
 * Este módulo contiene funciones puras de negocio.
 * NO debe tener ninguna referencia a 'req', 'res', Express ni HTTP.
 */

// Constantes con nombre (DRY y eliminación de números mágicos)
const MAX_PRESTAMOS_POR_ESTUDIANTE = 3;
const LONGITUD_MINIMA_TITULO = 3;
const CATEGORIAS_VALIDAS = [
  'Ingeniería',
  'Administración',
  'Derecho',
  'Psicología',
  'Medicina',
  'Ciencias Básicas',
  'General'
];

/**
 * Valida los datos requeridos para registrar u ofrecer un libro nuevo.
 * @param {object} datos - Objeto con datos del libro
 * @returns {{ valido: boolean, error?: string }}
 */
function validarLibro(datos) {
  if (!datos || typeof datos !== 'object') {
    return { valido: false, error: 'Los datos del libro son obligatorios' };
  }

  const { titulo, autor, categoria } = datos;

  if (!titulo || typeof titulo !== 'string' || titulo.trim().length < LONGITUD_MINIMA_TITULO) {
    return {
      valido: false,
      error: `El título es obligatorio y debe tener al menos ${LONGITUD_MINIMA_TITULO} caracteres`
    };
  }

  if (!autor || typeof autor !== 'string' || autor.trim().length === 0) {
    return {
      valido: false,
      error: 'El autor es obligatorio'
    };
  }

  if (categoria && !CATEGORIAS_VALIDAS.includes(categoria)) {
    return {
      valido: false,
      error: `La categoría '${categoria}' no es válida. Categorías permitidas: ${CATEGORIAS_VALIDAS.join(', ')}`
    };
  }

  return { valido: true };
}

/**
 * Calcula estadísticas agregadas sobre el catálogo de libros.
 * Caso límite manejado: si la lista está vacía, no divide entre cero.
 * @param {Array} listaLibros - Arreglo de libros
 * @returns {{ total: number, disponibles: number, prestados: number, porcentajeDisponibilidad: number }}
 */
function calcularResumen(listaLibros) {
  if (!Array.isArray(listaLibros) || listaLibros.length === 0) {
    return {
      total: 0,
      disponibles: 0,
      prestados: 0,
      porcentajeDisponibilidad: 0
    };
  }

  const total = listaLibros.length;
  const disponibles = listaLibros.filter(libro => Boolean(libro.disponible)).length;
  const prestados = total - disponibles;
  const porcentaje = (disponibles / total) * 100;

  return {
    total,
    disponibles,
    prestados,
    porcentajeDisponibilidad: Number(porcentaje.toFixed(1))
  };
}

/**
 * Evalúa si un estudiante puede solicitar un préstamo adicional.
 * @param {number} prestamosActivos - Cantidad actual de libros prestados
 * @returns {boolean} true si no ha alcanzado el límite máximo
 */
function puedeSolicitarPrestamo(prestamosActivos) {
  if (typeof prestamosActivos !== 'number' || prestamosActivos < 0) {
    return false;
  }
  return prestamosActivos < MAX_PRESTAMOS_POR_ESTUDIANTE;
}

module.exports = {
  MAX_PRESTAMOS_POR_ESTUDIANTE,
  LONGITUD_MINIMA_TITULO,
  CATEGORIAS_VALIDAS,
  validarLibro,
  calcularResumen,
  puedeSolicitarPrestamo
};
