# Libros-app - Plataforma de Intercambio Académico CUC
# Jhon Lara
# Marcos Montenegro
# Nicol Bredford

Aplicación web diseñada con HTML5, CSS3 y JavaScript vanilla para el intercambio y préstamo de textos académicos en la Universidad de la Costa (CUC).

## Estructura del Proyecto

```
Libros-app
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── repository.js
│   ├── state.js
│   └── ui.js
├── index.html
└── README.md
```

## Arquitectura de Módulos

- **`index.html`**: Estructura principal y carga secuencial de hojas de estilo y scripts modulares.
- **`css/styles.css`**: Sistema de diseño basado en la identidad visual de la CUC (Rojo institucional `#ba0013`, superficies cálidas `#fff8f7`, tipografía Playfair Display e Inter).
- **`js/repository.js`**: Capa de datos, persistencia en `localStorage`, catálogo de libros, préstamos activos y eventos del campus.
- **`js/state.js`**: Gestión centralizada del estado de navegación, filtros de búsqueda, autenticación y accesibilidad.
- **`js/ui.js`**: Generador de componentes de interfaz (Pantalla de inicio de sesión con vista dividida, panel principal de navegación, catálogo de libros, perfil académico, eventos y modales).
- **`js/main.js`**: Punto de entrada, orquestación de eventos y reactividad.
