# Residencial Monarca

Sitio web estático de Residencial Monarca, un residencial geriátrico que presenta su propuesta de cuidado, servicios, instalaciones y formas de contacto para residentes y sus familias.

## Funcionalidades

- Página de inicio responsive con navegación por secciones.
- Presentación institucional, misión, visión y valores.
- Perfil de dirección con contenido expandible.
- Sección de servicios con información sobre instalaciones, alimentación, talleres y equipo de enfermería.
- Galería fija de instalaciones organizada por categorías.
- Galería dinámica de actividades cargada desde `galeria.json`.
- Filtros de galería y visor ampliado de imágenes mediante lightbox.
- Gestor local para preparar y optimizar imágenes antes de incorporarlas al sitio.
- Enlaces de contacto, ubicación y redes sociales.

## Estructura del proyecto

```text
.
├── index.html             # Página principal
├── gestor_imagenes.html   # Herramienta local de gestión de imágenes
├── generate-gallery.js    # Genera galeria.json desde img/galeria
├── css/styles.css         # Estilos del sitio
├── js/main.js             # Menú, filtros, lightbox y galería dinámica
├── img/
│   ├── instalaciones/    # Imágenes fijas de las instalaciones
│   ├── galeria/           # Imágenes usadas por la galería dinámica
│   └── director.png       # Imagen del perfil de dirección
├── netlify.toml           # Configuración de publicación en Netlify
└── README.md
```

## Ejecución local

El sitio no necesita un proceso de compilación. Como la galería dinámica carga un archivo JSON, es recomendable usar un servidor HTTP local en lugar de abrir `index.html` directamente.

Con Node.js:

```bash
npx serve .
```

O con Python:

```bash
python -m http.server 8000
```

Después, abre la URL indicada por el servidor, normalmente `http://localhost:8000`.

## Actualizar la galería dinámica

1. Coloca las imágenes de actividades en `img/galeria/`.
2. Ejecuta el generador desde la raíz del proyecto:

```bash
node generate-gallery.js
```

3. Comprueba que se haya creado o actualizado `galeria.json`.
4. Recarga el sitio servido localmente.

El generador incluye archivos con extensión `.jpg`, `.jpeg`, `.png`, `.gif` y `.webp`.

## Tecnologías

- HTML5, CSS3 y JavaScript vanilla.
- Node.js únicamente para generar el índice de la galería.
- Google Fonts: Playfair Display y Plus Jakarta Sans.
- Font Awesome 6.4.0 mediante CDN.
- Netlify como opción de despliegue estático.

## Publicación

El proyecto puede publicarse en Netlify o en cualquier servicio que sirva archivos estáticos. No requiere backend ni base de datos. Antes de publicar, conviene verificar que los enlaces de WhatsApp, redes sociales y ubicación correspondan a los datos definitivos de la residencia.