/**
 * Capa de Datos: Repositorio de Libros CUC
 * Almacena en memoria el catálogo inicial de libros académicos.
 */

const catalogoInicial = [
  {
    id: 'book-1',
    titulo: 'Cálculo de Una Variable: Trascendentes Tempranas',
    autor: 'James Stewart',
    categoria: 'Ingeniería',
    edicion: '8va Edición (2022)',
    facultad: 'Facultad de Ingeniería',
    propietario: 'Biblioteca Central CUC',
    disponible: true,
    condicion: 'Excelente estado',
    portadaUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    descripcion: 'Texto fundamental para el cálculo diferencial e integral con aplicaciones en ingeniería.'
  },
  {
    id: 'book-2',
    titulo: 'Estructuras de Datos y Algoritmos en Java',
    autor: 'Robert Lafore',
    categoria: 'Ingeniería',
    edicion: '4ta Edición',
    facultad: 'Ingeniería de Sistemas',
    propietario: 'Carlos Mendoza (Estudiante)',
    disponible: true,
    condicion: 'Muy bueno con anotaciones',
    portadaUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    descripcion: 'Guía paso a paso sobre listas enlazadas, árboles binarios, grafos y algoritmos de optimización.'
  },
  {
    id: 'book-3',
    titulo: 'Principios de Administración Estratégica',
    autor: 'Arthur A. Thompson & John E. Gamble',
    categoria: 'Administración',
    edicion: '19na Edición',
    facultad: 'Ciencias Económicas',
    propietario: 'María Fernanda Rivas',
    disponible: false,
    condicion: 'Como nuevo',
    portadaUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    descripcion: 'Análisis de competitividad y ejecución de estrategias corporativas en mercados emergentes.'
  },
  {
    id: 'book-4',
    titulo: 'Derecho Constitucional Colombiano',
    autor: 'Rodrigo Uprimny & Manuel Sánchez',
    categoria: 'Derecho',
    edicion: '5ta Edición Actualizada',
    facultad: 'Facultad de Derecho',
    propietario: 'Valentina Castro',
    disponible: true,
    condicion: 'Excelente',
    portadaUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    descripcion: 'Compendio doctrinario sobre la Constitución de 1991, derechos fundamentales y mecanismos de tutela.'
  },
  {
    id: 'book-5',
    titulo: 'Termodinámica para Ingenieros',
    autor: 'Yunus A. Çengel & Michael A. Boles',
    categoria: 'Ingeniería',
    edicion: '9na Edición',
    facultad: 'Ingeniería Ambiental y Civil',
    propietario: 'Biblioteca Central CUC',
    disponible: true,
    condicion: 'Bueno',
    portadaUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    descripcion: 'Principios termodinámicos aplicados a la conservación de energía y transferencia de calor.'
  }
];

// Estado en memoria
let libros = JSON.parse(JSON.stringify(catalogoInicial));

function obtenerTodos() {
  return libros;
}

function obtenerPorId(id) {
  return libros.find(item => item.id === id) || null;
}

function agregar(nuevoLibro) {
  libros.push(nuevoLibro);
  return nuevoLibro;
}

function reiniciar() {
  libros = JSON.parse(JSON.stringify(catalogoInicial));
  return libros;
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  agregar,
  reiniciar
};
