# ADR-001: Diseño del almacenamiento del proyecto en Amazon S3

- Fecha: 2026-10-20
- Autores: Marcos Montenegro, Jhon Lara, Nicole Bradford
- Estado: Aceptada

## Contexto
El proyecto "Plataforma Web de Préstamos e Intercambio de Libros entre Estudiantes CUC" se encontraba publicado en un bucket público de Amazon S3, operando sin mecanismos de protección contra borrados accidentales ni criterios de clasificación de datos. Si un archivo crítico del frontend se eliminaba, la aplicación quedaba inmediatamente inalcanzable. Adicionalmente, ante la necesidad de empezar a gestionar datos sensibles de usuarios, registros de auditoría y copias de seguridad de la base de datos, el proyecto carecía de un esquema de almacenamiento estructurado que garantizara la seguridad, privacidad (Ley 1581 de 2012) y el control de costos operativos en la nube.

## Decisión
Se adoptó un esquema de almacenamiento segregado en dos buckets independientes por integrante del equipo:

1. **Buckets Públicos (`...-sitio-2026`):** Destinados exclusivamente a los assets del frontend (`index.html`, `css/styles.css`, `js/*.js`) y recursos gráficos (`portadas/`). Mantiene el versionado desactivado para evitar redundancia con el repositorio Git.
   - `cuc-bp-eq67-montenegro-sitio-2026`
   - `cuc-bp-eq67-lara-sitio-2026`
   - `cuc-bp-eq67-bradford-sitio-2026`

2. **Buckets Privados (`...-privado-2026`):** Destinados a datos confidenciales, estructurados mediante los prefijos `logs/`, `datos/`, `backups/` y `reportes/`. Tiene el versionado activado para prevenir pérdidas irreversibles por borrado accidental.
   - `cuc-bp-eq67-montenegro-privado-2026`
   - `cuc-bp-eq67-lara-privado-2026`
   - `cuc-bp-eq67-bradford-privado-2026`

3. **Regla de Ciclo de Vida (`retencion-prestamos-cuc`):** Aplicada en cada bucket para mover datos no consultados a Standard-IA a los 30 días, a Glacier a los 90 días, y eliminar versiones no vigentes tras 15 días.

## Alternativas consideradas
1. **Usar un solo bucket S3 gestionado por prefijos y Bucket Policies:** Se evaluó mantener un único bucket configurando permisos públicos solo en el prefijo `public/`. Se descartó porque un error de sintaxis en la política de S3 podría exponer accidentalmente el contenido privado del sistema.
2. **Dejar todo el almacenamiento en un proveedor PaaS tradicional (Netlify/Vercel):** Se descartó debido a que no ofrece un control nativo granular sobre reglas de ciclo de vida para archivos de base de datos o logs del backend, incrementando los costos a largo plazo.

## Consecuencias
### Positivas
- Resiliencia y capacidad de recuperación inmediata ante borrados accidentales en el bucket privado.
- Cumplimiento de políticas de privacidad de datos personales al aislar información confidencial.
- Optimización automatizada de costos de almacenamiento de hasta un 78% anual mediante las transiciones a Glacier.

### Costos o desventajas que aceptamos
- Ligero incremento de complejidad en el flujo de despliegue al administrar dos buckets distintos.
- Tiempos de latencia de varias horas al intentar recuperar archivos archivados en Glacier.

### Qué habría que revisar más adelante
- Monitorear el volumen de peticiones GET en Standard-IA para verificar si el patrón de acceso justifica mantener los 30 días o extender el plazo.
- Configurar alertas de facturación en AWS Budgets para evitar costos imprevistos por almacenamiento de versiones.