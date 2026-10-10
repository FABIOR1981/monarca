# Residencial Monarca

Sitio web estático de Residencial Monarca, un residencial geriátrico que presenta su propuesta de cuidado, servicios, instalaciones y formas de contacto para residentes y sus familias.

## Funcionalidades

- Página de inicio responsive con navegación por secciones.
- Presentación institucional, misión, visión y valores.
- Perfil de dirección con contenido expandible ("Ver más" / "Ver menos").
- Sección de servicios: instalaciones, alimentación, talleres y equipo de enfermería.
- Instalaciones dinámicas cargadas desde Cloudinary, ordenadas y con filtros por área generados automáticamente.
- Galería dinámica de actividades cargada desde Cloudinary.
- Visor ampliado de imágenes (lightbox).
- Enlaces de contacto, ubicación y redes sociales, configurables desde un único archivo.

## Estructura del proyecto

```text
.
├── index.html            # Página principal
├── css/styles.css        # Estilos del sitio
├── js/config.js          # Datos configurables: Cloudinary, contacto y redes
├── js/main.js            # Menú, galería dinámica, filtros y lightbox
├── img/                  # Logo e imagen del perfil de dirección
├── documentacion/        # Documentación interna (no se publica en Netlify)
├── netlify.toml          # Configuración de publicación en Netlify
├── .netlifyignore        # Archivos excluidos de la publicación
└── README.md
```

## Configuración (`js/config.js`)

Es el único lugar donde se cambian los datos del sitio. Se carga antes de `main.js`.

- `CLOUDINARY.CLOUD_NAME`: cuenta de Cloudinary desde donde se leen las imágenes.
- `CLOUDINARY.TAG_GALERIA`: etiqueta de las fotos de la galería de actividades.
- `CLOUDINARY.TAG_INSTALACIONES`: etiqueta de las fotos de instalaciones.
- `CONTACTO`: dirección, número de WhatsApp, Instagram y Facebook.

Este archivo es público (lo descarga el navegador). No guardes en él claves secretas ni presets de subida.

## Actualizar las imágenes

Las imágenes se leen desde Cloudinary por etiqueta, sin tocar el código del sitio:

1. Sube la imagen a Cloudinary con la etiqueta correspondiente (`TAG_GALERIA` o `TAG_INSTALACIONES`).
2. Para las instalaciones, opcionalmente completa estos metadatos de contexto: `caption` (título), `alt` (descripción), `area` (categoría del filtro) y `orden` (número de posición).
3. Recarga el sitio: la imagen aparece automáticamente.

La lectura por etiqueta requiere que Cloudinary tenga habilitada la lista de recursos por etiqueta (opción de seguridad "Resource list").

## Ejecución local

El sitio no necesita proceso de compilación. Conviene usar un servidor HTTP local en lugar de abrir `index.html` directamente.

Con Node.js:

```bash
npx serve .
```

O con Python:

```bash
python -m http.server 8000
```

Después, abre la URL indicada por el servidor, normalmente `http://localhost:8000`.

## Tecnologías

- HTML5, CSS3 y JavaScript vanilla.
- Cloudinary para el alojamiento y la entrega de imágenes.
- Google Fonts: Playfair Display y Plus Jakarta Sans.
- Font Awesome 6.4.0 mediante CDN.
- Netlify para el despliegue estático.

## Publicación

El proyecto se publica en Netlify sin paso de compilación (`publish = "."`). No requiere backend ni base de datos. Antes de publicar, conviene verificar que los enlaces de WhatsApp, redes sociales y ubicación correspondan a los datos definitivos de la residencia.
