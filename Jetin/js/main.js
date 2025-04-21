document.addEventListener('DOMContentLoaded', function() {
  document.documentElement.classList.add('js-loading');

  window.addEventListener('load', function() {
    setTimeout(() => {
      document.documentElement.classList.remove('js-loading');
      initializeComponents();
    }, 300);
  });

  function initializeComponents() {
    initHeader();
    initSliders();
    initForms();
  }

  function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll <= 0) {
        header.classList.remove('visible');
        return;
      }

      if (currentScroll > lastScroll && !header.classList.contains('visible')) {
        header.classList.add('visible');
      }

      lastScroll = currentScroll;
    });

    const navToggle = document.getElementById('navToggle');
    const closeNav = document.getElementById('closeNav');
    const fullscreenNav = document.getElementById('fullscreenNav');

    if (navToggle && fullscreenNav) {
      navToggle.addEventListener('click', () => {
        fullscreenNav.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeNav && fullscreenNav) {
      closeNav.addEventListener('click', () => {
        fullscreenNav.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    }

    const navMainItems = document.querySelectorAll('.nav-main-item');
    let currentlyOpenMenu = null;

    navMainItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const target = item.getAttribute('data-target');
        const submenu = document.getElementById(target);

        if (currentlyOpenMenu && currentlyOpenMenu !== submenu) {
          const currentlyOpenItem = document.querySelector(`[data-target="${currentlyOpenMenu.id}"]`);
          currentlyOpenItem?.classList.remove('active');
          currentlyOpenMenu.classList.remove('active');
        }

        item.classList.toggle('active');
        submenu?.classList.toggle('active');
        currentlyOpenMenu = submenu?.classList.contains('active') ? submenu : null;
      });
    });

    document.querySelectorAll('.submenu-item').forEach(item => {
      item.addEventListener('click', () => {
        fullscreenNav?.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }

  function initSliders() {
    if (typeof Swiper === 'undefined') return;

    const initSwiper = (selector, config) => {
      const el = document.querySelector(selector);
      if (el) new Swiper(el, config);
    };

    initSwiper('.destinations-slider', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });

    initSwiper('.fleet-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });

    initSwiper('.testimonials-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      speed: 600,
      effect: 'slide',
      touchRatio: 1,
      simulateTouch: true,
      touchAngle: 45,
      grabCursor: true
    });
  }

  function initForms() {
    // Flight Request Form
    const flightRequestForm = document.querySelector('.flight-request-form');
    if (flightRequestForm) {
      flightRequestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const flightDetails = {
          from: this.querySelector('#oneway-from').value,
          to: this.querySelector('#oneway-to').value,
          date: this.querySelector('#oneway-departure').value,
          passengers: this.querySelector('#oneway-passengers').value
        };
        updatePopupContent(flightDetails, 'Flight Request');
        document.getElementById('contact-popup').classList.add('active');
        document.body.style.overflow = 'hidden';
        this.reset();
      });
    }

    // Empty Legs Cards
    document.querySelectorAll('.book-now-btn').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.empty-leg-card');
        const getText = (selector) => card.querySelector(selector)?.textContent || 'N/A';
        const legDetails = {
          from: `${getText('.city-from .city-name')} (${getText('.city-from .city-code')})`,
          to: `${getText('.city-to .city-name')} (${getText('.city-to .city-code')})`,
          aircraft: getText('.empty-leg-spec:nth-child(1) span'),
          date: getText('.empty-leg-spec:nth-child(2) span'),
          passengers: getText('.empty-leg-spec:nth-child(3) span'),
          price: getText('.discounted-price')
        };
        updatePopupContent(legDetails, 'Empty Leg Booking');
        document.getElementById('contact-popup').classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Flight Contact Form
    const contactForm = document.getElementById('flight-contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(new FormData(this)).toString()
        }).then(() => {
          document.getElementById('contact-popup').classList.remove('active');
          document.getElementById('thankyou-popup').classList.add('active');
          document.body.style.overflow = 'hidden';
          this.reset();
        }).catch(error => {
          console.error('Submission failed:', error);
          alert('Submission failed. Please try again.');
        });
      });
    }

    // Newsletter Form
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(new FormData(this)).toString()
        }).then(() => {
          document.getElementById('newsletter-thankyou').classList.add('active');
          document.body.style.overflow = 'hidden';
          this.reset();
        }).catch(error => {
          console.error('Newsletter error:', error);
          alert('Submission failed. Please try again.');
        });
      });
    });

    // Contact Page Form
    const pageContactForm = document.querySelector('form.contact-form[name="contact"]');
    if (pageContactForm) {
      pageContactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(new FormData(this)).toString()
        }).then(() => {
          document.getElementById('thankyou-popup')?.classList.add('active');
          document.body.style.overflow = 'hidden';
          this.reset();
        }).catch(error => {
          console.error('Contact page error:', error);
          alert('Submission failed. Please try again.');
        });
      });
    }

    // Popup Close Buttons
    document.querySelectorAll('.popup-close, .close-thankyou, .close-newsletter-thankyou').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.popup-overlay').forEach(popup => {
          popup.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
      });
    });
  }

  function updatePopupContent(details, type = 'Flight') {
    const summaryHTML = `
      <div class="flight-summary-content">
        <h4><i class="fas fa-plane gradient-icon"></i> ${type}</h4>
        <div class="flight-detail-item"><i class="fas fa-route gradient-icon"></i><p>Route: ${details.from} → ${details.to}</p></div>
        ${details.aircraft ? `<div class="flight-detail-item"><i class="fas fa-jet-fighter gradient-icon"></i><p>Aircraft: ${details.aircraft}</p></div>` : ''}
        <div class="flight-detail-item"><i class="far fa-calendar-alt gradient-icon"></i><p>Date: ${details.date}</p></div>
        <div class="flight-detail-item"><i class="fas fa-users gradient-icon"></i><p>Passengers: ${details.passengers}</p></div>
        ${details.price ? `<div class="flight-detail-item"><i class="fas fa-tag gradient-icon"></i><p>Price: ${details.price}</p></div>` : ''}
        <div class="contact-info-section"><h4>Contact Information</h4><p>Will be collected in the form below</p></div>
      </div>
    `;
    document.getElementById('flight-summary').innerHTML = summaryHTML;
    document.getElementById('flight-details').value =
      `${type}: ${details.from} → ${details.to} | ${details.date} | ${details.passengers}${details.price ? ' | ' + details.price : ''}`;
  }
});

// Polyfill for older browsers
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}