# Libros-app — Plataforma de Intercambio Académico CUC

Plataforma web colaborativa para el préstamo e intercambio sostenible de textos académicos entre estudiantes y miembros de la comunidad de la Universidad de la Costa.

## Integrantes

- **Jhon Lara:** Arquitectura Back-end, API REST con Express, validación en servidor, seguridad CORS y despliegue en AWS EC2.
- **Nicol Bradford:** Arquitectura Front-end, aplicación SPA en React con Vite, componentes reutilizables (`BookCard`, `Navbar`) y consumo de API.
- **Marcos Montenegro:** Lógica de negocio pura, automatización de pruebas unitarias con Vitest, auditoría de dependencias y documentación técnica.

## Tecnologías

- **Front-end:** React 19, Vite, CSS institucional CUC.
- **Back-end:** Node.js, Express, CORS.
- **Testing:** Vitest.
- **Infraestructura Cloud:** AWS S3 (hosting estático) y AWS EC2 (servidor de aplicaciones).

## Cómo levantarlo en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Rizadoo/Libros-app.git
cd Libros-app
```

### 2. Levantar la API (Back-end)

```bash
cd api
cp .env.example .env
npm install
npm run dev
```

La API iniciará en http://localhost:3000.

### 3. Levantar la aplicación web (Front-end)

```bash
cd ../front
cp .env.example .env.development
npm install
npm run dev
```

El cliente web iniciará en http://localhost:5173.

### Variables de entorno

- **`api/.env`:**
  - `PORT`: puerto de escucha del servidor Express (3000).
  - `CORS_ORIGIN`: origen permitido para solicitudes HTTP (`http://localhost:5173` en desarrollo / URL del bucket en producción).
- **`front/.env.development` / `front/.env.production`:**
  - `VITE_API_URL`: dirección base de la API consumida mediante `import.meta.env.VITE_API_URL`.

## Endpoints de la API

| Método | Ruta | Qué hace | Respuesta exitosa | Error |
| :--- | :--- | :--- | :--- | :--- |
| GET | `/salud` | Diagnóstico de disponibilidad de la API | `200 OK` (objeto JSON) | - |
| GET | `/libros` | Listado general con filtro opcional por categoría | `200 OK` (arreglo de libros) | - |
| GET | `/libros/resumen` | Totales y métricas calculadas por la capa lógica | `200 OK` (objeto JSON) | - |
| GET | `/libros/:id` | Búsqueda de un libro por su ID único | `200 OK` (objeto libro) | `404 Not Found` |
| POST | `/libros` | Registra un nuevo libro académico en el catálogo | `201 Created` (libro creado) | `400 Bad Request` |

## Cómo correr las pruebas

Las pruebas unitarias están automatizadas con Vitest y prueban la lógica pura sin acoplamiento HTTP. Son 5 pruebas que cubren la validación de títulos, el cálculo del resumen y casos límite (el límite de 3 préstamos activos y la lista vacía).

```bash
cd api
npm install
npm test
```

Para modo interactivo en desarrollo:

```bash
npm run test:watch
```

## Despliegue en AWS y Seguridad

### Front-end (AWS S3)

| Integrante | URL del sitio | Bucket público | Bucket privado |
| :--- | :--- | :--- | :--- |
| Jhon Lara | http://cuc-bp-eq67-lara-sitio-2026.s3-website-us-east-1.amazonaws.com | cuc-bp-eq67-lara-sitio-2026 | cuc-bp-eq67-lara-privado-2026 |
| Marcos Montenegro | http://cuc-bp-eq67-montenegro-sitio-2026.s3-website-us-east-1.amazonaws.com | cuc-bp-eq67-montenegro-sitio-2026 | cuc-bp-eq67-montenegro-privado-2026 |
| Nicol Bradford | http://cuc-bp-eq67-bradford-sitio-2026.s3-website-us-east-1.amazonaws.com | cuc-bp-eq67-bradford-sitio-2026 | cuc-bp-eq67-bradford-privado-2026 |

Se realizó la migración del sitio web estático de Netlify a AWS S3 con el fin de centralizar la infraestructura del proyecto en AWS, optimizar los costos de alojamiento y aprovechar el control que ofrecen las políticas de bucket de S3. Además, esto facilita la integración directa con otros servicios de AWS en las siguientes fases del proyecto.

**Procedimiento de despliegue:**

1. Configurar la URL de la API en `front/.env.production`.
2. Compilar el cliente optimizado: `cd front && npm run build`.
3. Sincronizar el contenido de `front/dist/` en la raíz del bucket público S3.

### Back-end (AWS EC2)

- **Instancia:** Ubuntu Server en AWS EC2 (puerto 3000).
- **Procedimiento de despliegue:**
  1. Conectarse a la instancia y clonar el repositorio.
  2. Entrar a `api/` y crear `.env` con el origen restringido al bucket de S3.
  3. Ejecutar `npm install` y levantar el servidor con `node src/servidor.js` (o con el gestor `pm2`).

### Auditoría de seguridad (`npm audit`)

Se ejecutó `npm audit` en ambas capas del proyecto el 19 de noviembre de 2026:

| Capa | Comando | Resultado |
| :--- | :--- | :--- |
| Back-end (`api/`) | `npm audit` | 0 vulnerabilidades encontradas |
| Front-end (`front/`) | `npm audit` | 0 vulnerabilidades encontradas |

Las dependencias instaladas no presentan vulnerabilidades conocidas y no afectan el entorno de desarrollo.