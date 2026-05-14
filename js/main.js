/* ============================================
   GAABA SPORT - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ---- Mobile Menu Toggle ----
  const menuToggle = document.querySelector('.menu-toggle');
  const navbarNav = document.querySelector('.navbar-nav');

  if (menuToggle && navbarNav) {
    menuToggle.addEventListener('click', function() {
      navbarNav.classList.toggle('active');
      const spans = menuToggle.querySelectorAll('span');
      if (navbarNav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking a link
    navbarNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navbarNav.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // ---- Hero Slideshow ----
  initHeroSlideshow();

  // ---- Animated Counters ----
  initCounters();

  // ---- Scroll Animations ----
  initScrollAnimations();

  // ---- Product Filter ----
  initProductFilter();

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ---- Form Validation ----
  initFormValidation();

  // ---- WhatsApp Pre-fill ----
  initWhatsAppPreFill();
});

/* ---- Hero Slideshow ---- */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-prev');
  const nextBtn = document.querySelector('.hero-next');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 6000;

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (dots[i]) dots[i].classList.remove('active');
    });

    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      goToSlide(index);
      startAutoSlide();
    });
  });

  // Start auto-slide
  startAutoSlide();

  // Pause on hover
  const slideshow = document.querySelector('.hero-slideshow');
  if (slideshow) {
    slideshow.addEventListener('mouseenter', stopAutoSlide);
    slideshow.addEventListener('mouseleave', startAutoSlide);
  }
}

/* ---- Animated Counters ---- */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observerOptions = {
    threshold: 0.5
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => counterObserver.observe(counter));
}

/* ---- Scroll Animations ---- */
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  if (!fadeElements.length) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));
}

/* ---- Product Filter ---- */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (!filterBtns.length || !productCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 400);
        }
      });
    });
  });
}

/* ---- Form Validation ---- */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'var(--primary-red)';
          field.style.boxShadow = '0 0 15px rgba(204,0,0,0.3)';

          setTimeout(() => {
            field.style.borderColor = '';
            field.style.boxShadow = '';
          }, 3000);
        }
      });

      if (!isValid) {
        e.preventDefault();
        // Show error message
        const errorMsg = form.querySelector('.form-error') || document.createElement('div');
        errorMsg.className = 'form-error';
        errorMsg.style.cssText = 'color: var(--primary-red); font-family: Rajdhani; font-size: 14px; margin-top: 12px; padding: 12px; background: rgba(204,0,0,0.1); border: 1px solid rgba(204,0,0,0.3); border-radius: 4px;';
        errorMsg.textContent = 'Please fill in all required fields.';

        if (!form.querySelector('.form-error')) {
          form.appendChild(errorMsg);
        }

        setTimeout(() => {
          if (errorMsg.parentNode) errorMsg.remove();
        }, 5000);
      }
    });
  });
}

/* ---- WhatsApp Pre-fill ---- */
function initWhatsAppPreFill() {
  const whatsappButtons = document.querySelectorAll('[data-whatsapp-product]');

  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const product = this.getAttribute('data-whatsapp-product');
      const message = encodeURIComponent(
        `Hi Gaaba Sport, I'm interested in your ${product}. Can you please send me pricing and MOQ details?`
      );
      this.href = `https://wa.me/923002021742?text=${message}`;
    });
  });
}

/* ---- Lazy Loading Images ---- */
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

/* ---- Parallax Effect for Hero ---- */
window.addEventListener('scroll', function() {
  const parallaxElements = document.querySelectorAll('.parallax');
  parallaxElements.forEach(el => {
    const speed = el.getAttribute('data-speed') || 0.5;
    const yPos = -(window.scrollY * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
});
