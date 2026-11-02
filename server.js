const http = require('http');

// Corrección Señal 4: Número suelto con nombre (la nota mínima ya no está escondida en una comparación)
const NOTA_MINIMA = 3.0;

// Corrección Señal 4: Nombre descriptivo (antes: d)
const notasDelCurso = [4.5, 3.5, 2.5, 4.0];

// Corrección Señal 2: Separación de Lógica (calcula sin saber de HTTP)
function calcularPromedio(notas) {
    let suma = 0;
    for (let i = 0; i < notas.length; i++) {
        suma = suma + notas[i];
    }
    return suma / notas.length;
}

// Corrección Señal 1: Centralización de Respuesta (DRY)
function responder(res, codigo, datos) {
    res.writeHead(codigo, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(datos, null, 2));
}

// Corrección Señal 4: Nombre descriptivo (antes: s)
const servidor = http.createServer((req, res) => {
    if (req.url === '/salud') {
        return responder(res, 200, { estado: 'ok' });
    }

    if (req.url === '/equipo') {
        return responder(res, 200, {
            equipo: 'Equipo 67',
            integrantes: ['Jhon Lara', 'Marcos Montenegro', 'Melanie Bradford']
        });
    }

    if (req.url === '/notas') {
        // Corrección Señal 4: Nombre descriptivo (antes: p) y uso de la constante (antes: 3.0 suelto)
        let promedio = calcularPromedio(notasDelCurso);
        return responder(res, 200, { promedio: promedio, aprobado: promedio >= NOTA_MINIMA });
    }

    return responder(res, 404, { error: 'Ruta no encontrada' });
});

servidor.listen(80);