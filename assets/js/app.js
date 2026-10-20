document.addEventListener('DOMContentLoaded', () => {

  const menuItems = [
    // TABLAS XXL
    { category: "tablas", title: "Tabla Solomillo", price: "21.00 €" },
    { category: "tablas", title: "Tabla Costillas", price: "23.00 €" },
    { category: "tablas", title: "Tabla Entraña", price: "25.00 €" },
    { category: "tablas", title: "Tabla Salchipapas", price: "14.00 €" },
    { category: "tablas", title: "Tabla Secreto", price: "21.00 €" },

    // HAMBURGUESAS
    { category: "hamburguesas", title: "La Clásica", price: "Consulte en local" },
    { category: "hamburguesas", title: "La Cheese Lovers", price: "Consulte en local" },
    { category: "hamburguesas", title: "La Trufada", price: "Consulte en local" },
    { category: "hamburguesas", title: "La Castiza", price: "Consulte en local" },
    { category: "hamburguesas", title: "La Emmy", price: "Consulte en local" },
    { category: "hamburguesas", title: "La Nashville", price: "Consulte en local" },

    // PARA COMPARTIR
    { category: "compartir", title: "Focaccia para dipear", price: "Consulte en local" },
    { category: "compartir", title: "Patatas Búfalo", price: "Consulte en local" },
    { category: "compartir", title: "Patatas Bravas Tradicionales", price: "6.00 €" },
    { category: "compartir", title: "Tequeños", price: "7.50 €" },
    { category: "compartir", title: "Bacon Cheese Fries", price: "7.00 €" },
    { category: "compartir", title: "Gyozas Fritas", price: "6.00 €" },
    { category: "compartir", title: "Fingers de Pollo", price: "8.00 €" },
    { category: "compartir", title: "Croquetas Cremosas", price: "8.50 €" },
    { category: "compartir", title: "Tortilla de Patatas", price: "7.00 €" },
    { category: "compartir", title: "Tortilla de Patatas Carbonara", price: "8.00 €" },
    { category: "compartir", title: "Focaccia de Burrata", price: "11.00 €" },
    { category: "compartir", title: "Ensalada César", price: "10.00 €" },
    { category: "compartir", title: "Nachos Texanos", price: "11.00 €" },
    { category: "compartir", title: "Ñoquis Bravos", price: "8.00 €" },
    { category: "compartir", title: "Alitas de Pollo", price: "9.50 €" },
    { category: "compartir", title: "Corn Ribs", price: "8.00 €" },
    { category: "compartir", title: "Ensalada de Burrata", price: "10.00 €" },
    { category: "compartir", title: "Pescaito Frito", price: "10.00 €" },

    // BRIOCHES
    { category: "brioches", title: "Brioche Tinga de Pollo", price: "Consulte en local" },
    { category: "brioches", title: "Brioche Pulled Pork", price: "Consulte en local" },
    { category: "brioches", title: "Brioche Panceta Frita", price: "Consulte en local" },
    { category: "brioches", title: "Brioche Salchicha", price: "Consulte en local" },
    { category: "brioches", title: "Brioche Ternera Melosa", price: "Consulte en local" },

    // OPCIÓN FIT
    { category: "fit", title: "Pollo Marinado", price: "15.00 €" },
    { category: "fit", title: "Entraña Fit", price: "15.00 €" },
    { category: "fit", title: "Seitán Fit", price: "15.00 €" },
    { category: "fit", title: "Secreto Fit", price: "15.00 €" },

    // POSTRES
    { category: "postres", title: "Brownie Chocolate", price: "Consulte en local" },
    { category: "postres", title: "Donut Caramelizado", price: "Consulte en local" },
    { category: "postres", title: "Cookie Americana Chocolate Blanco", price: "Consulte en local" }
  ];

  const menuGrid = document.getElementById('menu-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderMenu(category) {
    menuGrid.innerHTML = '';
    
    const filteredItems = menuItems.filter(item => item.category === category);

    filteredItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.innerHTML = `
        <div class="menu-card-header">
          <h3 class="menu-card-title">${item.title}</h3>
          <span class="menu-card-price">${item.price}</span>
        </div>
      `;
      menuGrid.appendChild(card);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      renderMenu(category);
    });
  });

  renderMenu('tablas');

  const slider = document.getElementById('testimonialSlider');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prevReview');
  const nextBtn = document.getElementById('nextReview');
  const progressBarFill = document.getElementById('progressBarFill');

  let currentIndex = 0;
  const totalSlides = cards.length;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    const progressWidth = ((currentIndex + 1) / totalSlides) * 100;
    progressBarFill.style.width = `${progressWidth}%`;
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

  let autoSlide = setInterval(nextSlide, 4000);

  const sliderContainer = document.querySelector('.testimonial-slider-container');
  sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
  sliderContainer.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 4000);
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
    if (touchEndX < touchStartX - 40) nextSlide();
    if (touchEndX > touchStartX + 40) prevSlide();
  }

  updateSlider();
});
