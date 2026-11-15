/**
 * Servidor Principal de la API - Libros CUC
 * Buenas Prácticas de Desarrollo de Software · CUC
 */

const express = require('express');
const cors = require('cors');
const rutasLibros = require('./rutas/libros');

const app = express();
const PUERTO = process.env.PORT || 3000;

// Configuración de CORS:
// En desarrollo permite peticiones locales; en producción se restringe al bucket S3
const origenPermitido = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: origenPermitido,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Entender cuerpos con formato JSON
app.use(express.json());

// Middleware DRY: Registro de peticiones (Logging centralizado)
app.use((req, res, siguiente) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  siguiente();
});

// Ruta de salud e información general
app.get('/salud', (req, res) => {
  res.status(200).json({
    estado: 'ok',
    servicio: 'API Plataforma de Libros CUC',
    entorno: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Montaje de rutas modulares
app.use('/libros', rutasLibros);

// Manejador centralizado para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

// Iniciar el servidor
app.listen(PUERTO, () => {
  console.log(`=================================================`);
  console.log(`🚀 API Libros CUC escuchando en el puerto ${PUERTO}`);
  console.log(`📡 CORS configurado para: ${origenPermitido}`);
  console.log(`📚 Endpoints disponibles:`);
  console.log(`   GET  http://localhost:${PUERTO}/salud`);
  console.log(`   GET  http://localhost:${PUERTO}/libros`);
  console.log(`   GET  http://localhost:${PUERTO}/libros/resumen`);
  console.log(`   POST http://localhost:${PUERTO}/libros`);
  console.log(`=================================================`);
});

module.exports = app;
