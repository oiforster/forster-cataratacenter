/* ============================================
   CATARATA CENTER — Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- NAV scroll behavior ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function updateNav() {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = scrollY;
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
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation delay
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
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

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
