const http = require('http');
const d = [4.5, 3.5, 2.5, 4.0];

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

const s = http.createServer((req, res) => {
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
        let p = calcularPromedio(d);
        return responder(res, 200, { promedio: p, aprobado: p >= 3.0 });
    }

    return responder(res, 404, { error: 'Ruta no encontrada' });
});

s.listen(80)
