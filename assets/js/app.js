document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     DATOS DE LA CARTA INTERACTIVA - CALIMA
     ========================================================================== */
  const menuItems = [
    // TABLAS XXL
    {
      id: 1,
      title: "Tabla de Solomillo XXL",
      category: "tablas",
      price: "28.90 €",
      description: "Tierno solomillo de ternera trinchado en piedra caliente, con escamas de sal marina y patatas rústicas.",
      image: "assets/images/tabla-solomillo.jpg"
    },
    {
      id: 2,
      title: "Tabla Ibérica Calima",
      category: "tablas",
      price: "24.50 €",
      description: "Jamón de cebo de campo, lomo embuchado, queso curado de oveja, chorizo ibérico y pan con tomate.",
      image: "assets/images/tabla-ibericos.jpg"
    },
    {
      id: 3,
      title: "Tabla de Quesos Selección",
      category: "tablas",
      price: "19.90 €",
      description: "Selección de 5 quesos artesanos servidos con mermelada de higo, nueces y tostadas gourmet.",
      image: "assets/images/tabla-quesos.jpg"
    },

    // HAMBURGUESAS
    {
      id: 4,
      title: "Hamburguesa La Trufada",
      category: "hamburguesas",
      price: "14.50 €",
      description: "200g de vacuno madurado, queso gouda ahumado, cebolla caramelizada y mayonesa de trufa en pan brioche.",
      image: "assets/images/hamburguesa-trufada.jpg"
    },
    {
      id: 5,
      title: "Brioche Pulled Pork",
      category: "hamburguesas",
      price: "12.90 €",
      description: "Cerdo deshilachado 12h a baja temperatura, salsa BBQ Calima y coleslaw fresca en pan brioche.",
      image: "assets/images/brioche-pulled-pork.jpg"
    },

    // ENTRANTES
    {
      id: 6,
      title: "Nachos Calima XXL",
      category: "entrantes",
      price: "13.90 €",
      description: "Totopos crujientes con queso cheddar fundido, chili con carne, jalapeños, pico de gallo y crema agria.",
      image: "assets/images/nachos-xxl.jpg"
    },

    // POSTRES
    {
      id: 7,
      title: "Tarta de Queso Fluida",
      category: "postres",
      price: "6.50 €",
      description: "Receta artesana horneada a diario con centro cremoso de queso y base de galleta de mantequilla.",
      image: "assets/images/tarta-queso.jpg"
    }
  ];

  /* ==========================================================================
     RENDERIZADO Y FILTRADO DE CARTA
     ========================================================================== */
  const menuGrid = document.getElementById('menu-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderMenu(category) {
    menuGrid.innerHTML = '';
    
    const filteredItems = menuItems.filter(item => item.category === category);

    filteredItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'highlight-card';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="menu-thumb" loading="lazy">
        <div class="card-content">
          <div class="card-header-row">
            <h3>${item.title}</h3>
            <span class="price">${item.price}</span>
          </div>
          <p>${item.description}</p>
        </div>
      `;
      menuGrid.appendChild(card);
    });
  }

  // Filtrado al hacer clic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      renderMenu(category);
    });
  });

  // Categoría activa por defecto: Tablas XXL
  renderMenu('tablas');

  /* ==========================================================================
     CARRUSEL INTERACTIVO DE RESEÑAS
     ========================================================================== */
  const slider = document.getElementById('testimonialSlider');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prevReview');
  const nextBtn = document.getElementById('nextReview');
  const dotsContainer = document.getElementById('sliderDots');

  let currentIndex = 0;
  const totalSlides = cards.length;

  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  let autoSlide = setInterval(nextSlide, 5000);

  const sliderContainer = document.querySelector('.testimonial-slider-container');
  sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
  sliderContainer.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
  });

  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
  }
});
