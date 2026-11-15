import { describe, it, expect } from 'vitest';
import {
  validarLibro,
  calcularResumen,
  puedeSolicitarPrestamo,
  MAX_PRESTAMOS_POR_ESTUDIANTE
} from './reglas-libros';

describe('Suite de Pruebas Unitarias - Reglas de Negocio Libros CUC', () => {

  // PRUEBA 1: Validación exitosa
  it('P1: Debe validar correctamente un libro con datos válidos', () => {
    const libroValido = {
      titulo: 'Física Universitaria',
      autor: 'Sears & Zemansky',
      categoria: 'Ingeniería'
    };
    const resultado = validarLibro(libroValido);
    expect(resultado.valido).toBe(true);
    expect(resultado.error).toBeUndefined();
  });

  // PRUEBA 2: Validación fallida por título corto o ausente
  it('P2: Debe rechazar un libro con título menor a 3 caracteres o vacío', () => {
    const libroInvalido = {
      titulo: 'Ab',
      autor: 'Autor Ejemplo'
    };
    const resultado = validarLibro(libroInvalido);
    expect(resultado.valido).toBe(false);
    expect(resultado.error).toContain('al menos 3 caracteres');
  });

  // PRUEBA 3: Cálculo del resumen con datos reales
  it('P3: Debe calcular el resumen con totales y porcentaje de disponibilidad correctos', () => {
    const muestraLibros = [
      { id: '1', titulo: 'Libro A', disponible: true },
      { id: '2', titulo: 'Libro B', disponible: false },
      { id: '3', titulo: 'Libro C', disponible: true },
      { id: '4', titulo: 'Libro D', disponible: true }
    ];
    const resumen = calcularResumen(muestraLibros);

    expect(resumen.total).toBe(4);
    expect(resumen.disponibles).toBe(3);
    expect(resumen.prestados).toBe(1);
    expect(resumen.porcentajeDisponibilidad).toBe(75.0);
  });

  // PRUEBA 4 (CASO LÍMITE FRONTERA): Umbral exacto de préstamos por estudiante
  it('P4 [Caso Límite]: Permite prestar con 2 libros activos pero rechaza exactamente en el límite de 3', () => {
    // Justo por debajo del límite: PERMITIDO
    expect(puedeSolicitarPrestamo(2)).toBe(true);

    // Exactamente en el límite (MAX_PRESTAMOS_POR_ESTUDIANTE = 3): RECHAZADO
    expect(puedeSolicitarPrestamo(MAX_PRESTAMOS_POR_ESTUDIANTE)).toBe(false);

    // Por encima del límite: RECHAZADO
    expect(puedeSolicitarPrestamo(4)).toBe(false);
  });

  // PRUEBA 5 (CASO LÍMITE FRONTERA): Resumen con lista vacía sin división entre cero
  it('P5 [Caso Límite]: Debe manejar lista vacía devolviendo 0% sin romperse por división entre cero', () => {
    const resumenVacio = calcularResumen([]);

    expect(resumenVacio.total).toBe(0);
    expect(resumenVacio.disponibles).toBe(0);
    expect(resumenVacio.prestados).toBe(0);
    expect(resumenVacio.porcentajeDisponibilidad).toBe(0);
  });
});
