document.addEventListener('DOMContentLoaded', () => {

    // 1. Menú Hamburguesa Móvil
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Filtro Interactivo del Menú Gastronómico
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-item');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            menuItems.forEach(item => {
                if (item.getAttribute('data-category') === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // 3. Header Shadow on Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

    // 4. Carrousel de Reseñas Interactivo con Barra de Progreso y Desplazamiento
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const progressFill = document.getElementById('progressFill');
    const totalSlides = slides.length;
    
    let currentIndex = 0;
    const slideDuration = 4000; // 4 segundos por reseña
    let intervalId = null;
    let progressIntervalId = null;
    let progress = 0;

    function updateCarousel(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        resetProgress();
    }

    function resetProgress() {
        progress = 0;
        if (progressFill) progressFill.style.width = '0%';
    }

    function startAutoSlide() {
        stopAutoSlide();
        
        const updateFrequency = 50; // ms
        const increment = (updateFrequency / slideDuration) * 100;

        progressIntervalId = setInterval(() => {
            progress += increment;
            if (progressFill) progressFill.style.width = `${Math.min(progress, 100)}%`;
            if (progress >= 100) {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel(currentIndex);
            }
        }, updateFrequency);
    }

    function stopAutoSlide() {
        if (progressIntervalId) clearInterval(progressIntervalId);
    }

    // Touch & Drag Swipe functionality
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;

    track.addEventListener('touchstart', touchStart);
    track.addEventListener('touchend', touchEnd);
    track.addEventListener('touchmove', touchMove);

    track.addEventListener('mousedown', touchStart);
    track.addEventListener('mouseup', touchEnd);
    track.addEventListener('mouseleave', touchEnd);
    track.addEventListener('mousemove', touchMove);

    function touchStart(event) {
        stopAutoSlide();
        isDragging = true;
        startX = getPositionX(event);
    }

    function touchMove(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        const diff = currentPosition - startX;
    }

    function touchEnd(event) {
        if (!isDragging) return;
        isDragging = false;
        const endX = getPositionX(event);
        const diff = endX - startX;

        if (diff < -50) {
            // Next
            currentIndex = (currentIndex + 1) % totalSlides;
        } else if (diff > 50) {
            // Prev
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        }
        updateCarousel(currentIndex);
        startAutoSlide();
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    }

    // Iniciar carrousel automático al cargar
    startAutoSlide();

    // 5. Simulación de sincronización con Google Maps API para valoración dinámica
    fetchGoogleRating();

    function fetchGoogleRating() {
        // En un entorno de producción, aquí se conecta con la API de Google Places
        const ratingElement = document.getElementById('google-rating');
        const reviewsCountElement = document.getElementById('google-reviews-count');
        
        if(ratingElement) ratingElement.textContent = "4.5";
        if(reviewsCountElement) reviewsCountElement.textContent = "(+280 opiniones)";
    }

});
