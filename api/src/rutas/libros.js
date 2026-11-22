/**
 * Capa de Rutas: Endpoints REST para Libros CUC.
 * Responsabilidad: Recibir petición HTTP (req), llamar la lógica y responder (res).
 */

const express = require('express');
const router = express.Router();
const repositorio = require('../datos/repositorio');
const { validarLibro, calcularResumen } = require('../logica/reglas-libros');

/**
 * GET /libros/resumen
 * Retorna estadísticas consolidadas del catálogo (cálculo de lógica).
 */
router.get('/resumen', (req, res) => {
  const todos = repositorio.obtenerTodos();
  const resumen = calcularResumen(todos);
  res.status(200).json(resumen);
});

/**
 * GET /libros
 * Lista todos los libros del catálogo, con soporte de filtro opcional por categoría.
 */
router.get('/', (req, res) => {
  const { categoria } = req.query;
  let resultado = repositorio.obtenerTodos();

  if (categoria && categoria !== 'all') {
    resultado = resultado.filter(
      libro => libro.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }

  res.status(200).json(resultado);
});

/**
 * GET /libros/:id
 * Consulta un libro específico por su identificador.
 */
router.get('/:id', (req, res) => {
  const libro = repositorio.obtenerPorId(req.params.id);
  if (!libro) {
    return res.status(404).json({ error: `Libro con id '${req.params.id}' no encontrado` });
  }
  res.status(200).json(libro);
});

/**
 * POST /libros
 * Registra un nuevo libro en la plataforma con validación previa en el servidor.
 */
router.post('/', (req, res) => {
  const validacion = validarLibro(req.body);

  if (!validacion.valido) {
    // 400 Bad Request cuando el cliente envía datos incompletos o erróneos
    return res.status(400).json({ error: validacion.error });
  }

  const { titulo, autor, categoria, edicion, facultad, propietario, descripcion, portadaUrl } = req.body;

  const nuevoLibro = {
    id: `book-${Date.now()}`,
    titulo: titulo.trim(),
    autor: autor.trim(),
    categoria: categoria || 'General',
    edicion: edicion ? edicion.trim() : '1ra Edición',
    facultad: facultad ? facultad.trim() : 'General CUC',
    propietario: propietario ? propietario.trim() : 'Comunidad CUC',
    disponible: true,
    condicion: 'Bueno',
    portadaUrl: portadaUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    descripcion: descripcion ? descripcion.trim() : 'Sin descripción adicional.'
  };

  repositorio.agregar(nuevoLibro);

  // 201 Created cuando se crea satisfactoriamente un recurso
  res.status(201).json(nuevoLibro);
});

module.exports = router;
