/* ============================================
   CATARATA CENTER — Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- NAV scroll behavior ---
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // --- Mobile menu ---
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('mobile-menu--open');
      document.body.style.overflow = mobileMenu.classList.contains('mobile-menu--open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('mobile-menu--open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll reveal ---
  const revealElements = document.querySelectorAll('.reveal, .reveal--left, .reveal--right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation delay
        const siblings = entry.target.parentElement.querySelectorAll('.reveal, .reveal--left, .reveal--right');
        let siblingIndex = 0;
        siblings.forEach((sib, i) => {
          if (sib === entry.target) siblingIndex = i;
        });

        setTimeout(() => {
          entry.target.classList.add('reveal--visible');
        }, siblingIndex * 80);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Video sound toggle ---
  const soundBtn = document.querySelector('.sobre__sound-btn');
  const soundLabel = document.querySelector('.sobre__sound-label');
  const sobreVideo = document.querySelector('.sobre__video video');

  if (soundBtn && sobreVideo) {
    soundBtn.addEventListener('click', () => {
      sobreVideo.muted = !sobreVideo.muted;
      soundBtn.classList.toggle('sobre__sound-btn--active');
      soundLabel.textContent = sobreVideo.muted ? 'Ativar som' : 'Som ativado';
      soundBtn.setAttribute('aria-label', sobreVideo.muted ? 'Ativar som do vídeo' : 'Desativar som do vídeo');
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    link.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
