document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú Responsive Móvil
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
        });

        // Cerrar el menú al elegir una opción (en mobile no se colapsaba solo)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
            });
        });
    }

    // 2. Filtrado de Galería (Instalaciones)
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentActive = document.querySelector('.filter-btn.active');
            if (currentActive) currentActive.classList.remove('active');
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            // Filtrar solo dentro de instalaciones para no afectar la galería dinámica
            const instalacionesItems = document.querySelectorAll('#instalaciones .gallery-item');

            instalacionesItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 3. Cargar Galería Dinámica desde Cloudinary
    const galeriaDinamica = document.getElementById('galeria-dinamica');
    // Los datos de Cloudinary se definen en js/config.js
    const cfgCloudinary = (typeof CONFIG !== 'undefined' && CONFIG.CLOUDINARY) ? CONFIG.CLOUDINARY : {};
    const cloudName = cfgCloudinary.CLOUD_NAME;
    const tag = cfgCloudinary.TAG_GALERIA;

    function escaparHtml(texto) {
        return String(texto).replace(/[&<>'"]/g, caracter => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[caracter]));
    }

    function obtenerTitulo(imagen) {
        const titulo = imagen.context?.custom?.caption;
        if (titulo && titulo.trim()) return titulo.trim();

        const nombre = imagen.public_id.split('/').pop().replace(/[-_]+/g, ' ').trim();
        return nombre ? nombre.charAt(0).toUpperCase() + nombre.slice(1) : 'Actividad en Monarca';
    }

    function obtenerDescripcion(imagen) {
        const descripcion = imagen.context?.custom?.alt;
        return descripcion && descripcion.trim() ? descripcion.trim() : '';
    }
    
    if (galeriaDinamica && cloudName && tag) {
        fetch(`https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`)
            .then(response => {
                if (!response.ok) throw new Error("No se pudo obtener la lista de Cloudinary. Verifica el Tag o la opción 'Resource list' en Security.");
                return response.json();
            })
            .then(data => {
                const imagenes = data.resources || [];

                if (imagenes.length === 0) {
                    galeriaDinamica.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">Próximamente compartiremos más momentos.</p>';
                    return;
                }

                // Generar HTML por cada imagen aprovechando la optimización automática (q_auto, f_auto)
                const htmlImagenes = imagenes.map(img => {
                    const urlImagen = `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto,w_1200,c_limit/v${img.version}/${img.public_id}.${img.format}`;
                    const titulo = escaparHtml(obtenerTitulo(img));
                    const descripcion = escaparHtml(obtenerDescripcion(img));
                    
                    return `
                        <div class="gallery-item">
                            <img src="${urlImagen}" alt="${titulo}${descripcion ? `: ${descripcion}` : ''}" loading="lazy">
                            <div class="gallery-overlay">
                                <h3>${titulo}</h3>
                                ${descripcion ? `<p>${descripcion}</p>` : ''}
                            </div>
                        </div>
                    `;
                }).join('');
                
                galeriaDinamica.innerHTML = htmlImagenes;

                // Inicializar Lightbox después de renderizar las fotos de Cloudinary
                inicializarLightbox();
            })
            .catch(error => {
                console.error('Error cargando la galería desde Cloudinary:', error);
                galeriaDinamica.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">Próximamente compartiremos más momentos.</p>';
                inicializarLightbox(); // Inicializa para las fotos fijas si la API falla
            });
    } else {
        inicializarLightbox();
    }

    // 4. Lógica general para botones expandibles ("Ver más" / "Ver menos")
    const expandableButtons = document.querySelectorAll('.btn-leer-mas');

    expandableButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const container = document.getElementById(targetId);

            if (container) {
                container.classList.toggle('expanded');

                if (container.classList.contains('expanded')) {
                    button.textContent = 'Ver menos';
                } else {
                    button.textContent = 'Ver más';
                    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });

    // 5. Lógica del Lightbox
    function inicializarLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');
        const allGalleryItems = document.querySelectorAll('.gallery-item');

        if (!lightbox || !lightboxImg || !lightboxClose) return;

        allGalleryItems.forEach(item => {
            // Prevenir múltiples eventos clonando el nodo
            const nuevoItem = item.cloneNode(true);
            item.parentNode.replaceChild(nuevoItem, item);
            
            nuevoItem.addEventListener('click', () => {
                const imgElement = nuevoItem.querySelector('img');
                if (imgElement) {
                    lightboxImg.setAttribute('src', imgElement.getAttribute('src'));
                    lightbox.style.display = 'flex';
                }
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
            }
        });
    }

    // 5. Datos de contacto y redes desde config.js
    // Si un valor está vacío, se deja el enlace/texto que ya trae index.html.
    const cfgContacto = (typeof CONFIG !== 'undefined' && CONFIG.CONTACTO) ? CONFIG.CONTACTO : {};

    function asignarEnlace(clave, url) {
        if (!url) return;
        document.querySelectorAll(`[data-config="${clave}"]`).forEach(el => { el.href = url; });
    }

    asignarEnlace('whatsapp', cfgContacto.WHATSAPP_NUMERO && `https://wa.me/${cfgContacto.WHATSAPP_NUMERO}`);
    asignarEnlace('instagram', cfgContacto.INSTAGRAM_URL);
    asignarEnlace('facebook', cfgContacto.FACEBOOK_URL);

    if (cfgContacto.DIRECCION) {
        document.querySelectorAll('[data-config="direccion"]').forEach(el => { el.textContent = cfgContacto.DIRECCION; });
        asignarEnlace('mapa', `https://maps.google.com/?q=${encodeURIComponent(cfgContacto.DIRECCION)}`);
    }
});