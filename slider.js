// Slider pour les autres projets
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slider-card');
  const prevBtn = document.querySelector('.slider-btn-prev');
  const nextBtn = document.querySelector('.slider-btn-next');
  const dotsContainer = document.querySelector('.slider-dots');
  
  let currentIndex = 0;
  let slidesPerView = getSlidesPerView();
  const totalSlides = slides.length;
  const maxIndex = Math.max(0, totalSlides - slidesPerView);

  function getSlidesPerView() {
    if (window.innerWidth >= 1025) {
      return 3;
    }
    return 1;
  }

  function createDots() {
    dotsContainer.innerHTML = '';
    const dotsCount = maxIndex + 1;
    
    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function updateSlider() {
    const slideWidth = 100 / slidesPerView;
    const offset = -(currentIndex * slideWidth);
    track.style.transform = `translateX(${offset}%)`;
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
    
    updateDots();
  }

  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateSlider();
  }

  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });

  window.addEventListener('resize', () => {
    const newSlidesPerView = getSlidesPerView();
    if (newSlidesPerView !== slidesPerView) {
      slidesPerView = newSlidesPerView;
      currentIndex = 0;
      createDots();
      updateSlider();
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      goToSlide(currentIndex + 1);
    }
    if (touchEndX > touchStartX + 50) {
      goToSlide(currentIndex - 1);
    }
  }

  createDots();
  updateSlider();
});