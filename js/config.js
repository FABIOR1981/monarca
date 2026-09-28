// Configuración general de Residencial Monarca
// Único lugar donde se cambian los datos del sitio: Cloudinary, contacto y redes.
// Debe cargarse ANTES de main.js (ver el final de index.html).
const CONFIG = {

  // --- Galería dinámica (Cloudinary) ---
  CLOUDINARY: {
    CLOUD_NAME: 'p0qlmlor',        // Cloud name de la cuenta
    UPLOAD_PRESET: 'subir_gestor',              // Preset unsigned de subida de Cloudinary
    CARPETA_BASE: 'monarca',        // Carpeta raíz para las imágenes subidas
    CARPETA_DEFAULT: 'galeria',     // Subcarpeta seleccionada por defecto
    TAG_GALERIA: 'monarca_galeria'  // Etiqueta que llevan las fotos de la galería
  },

  // --- Contacto y redes ---
  // Si un valor queda vacío (''), el sitio conserva el enlace que ya trae index.html.
  CONTACTO: {
    DIRECCION: 'Rivera 5734 esquina Vicente Rocafuerte', // También arma el enlace de Google Maps
    WHATSAPP_NUMERO: '',  // Formato internacional, solo dígitos. Ej: '59899123456'
    INSTAGRAM_URL: '',    // Ej: 'https://instagram.com/usuario'
    FACEBOOK_URL: ''      // Ej: 'https://facebook.com/pagina'
  }
};
