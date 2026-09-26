document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú Responsive Móvil
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // 2. Filtrado de Galería (Instalaciones)
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
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

    // 3. Cargar Galería Dinámica
    const galeriaDinamica = document.getElementById('galeria-dinamica');
    
    if (galeriaDinamica) {
        fetch('galeria.json')
            .then(response => {
                if (!response.ok) throw new Error("No se encontró galeria.json");
                return response.json();
            })
            .then(imagenes => {
                if (imagenes.length === 0) {
                    galeriaDinamica.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #666;">Próximamente compartiremos más momentos.</p>';
                    return;
                }

                // Generar HTML por cada imagen
                const htmlImagenes = imagenes.map(img => `
                    <div class="gallery-item">
                        <img src="img/galeria/${img}" alt="Actividad en Monarca" loading="lazy">
                        <div class="gallery-overlay">
                           
                        </div>
                    </div>
                `).join('');
                
                galeriaDinamica.innerHTML = htmlImagenes;

                // Inicializar Lightbox después de cargar las fotos
                inicializarLightbox();
            })
            .catch(error => {
                console.error('Error cargando la galería dinámica:', error);
                inicializarLightbox(); // Inicializar para las fotos fijas al menos
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
            // Prevenir múltiples eventos si se llama varias veces
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
});