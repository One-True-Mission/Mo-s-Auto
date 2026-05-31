/* ===== MO'S MOBILE MECHANIC | OTM Web Design ===== */

/* Mobile menu module (own IIFE so a failure cannot break other scripts) */
(function () {
  var body = document.body;
  var hamburger = document.getElementById('hamburger');
  var backdrop = document.getElementById('navBackdrop');
  var menu = document.getElementById('mobileMenu');
  if (!hamburger || !backdrop || !menu) return;

  function openMenu() {
    body.classList.add('nav-open');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  }
  function closeMenu() {
    body.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  }
  function toggleMenu() {
    if (body.classList.contains('nav-open')) { closeMenu(); } else { openMenu(); }
  }

  hamburger.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) closeMenu();
  });
})();

/* Subtle nav background shift on scroll (own IIFE) */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  function onScroll() {
    if (window.scrollY > 30) {
      nav.style.background = 'rgba(15, 16, 19, 0.97)';
    } else {
      nav.style.background = 'rgba(18, 19, 22, 0.92)';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* Active nav state (own IIFE) */
(function () {
  var page = document.body.getAttribute('data-page');
  if (!page) return;
  document.querySelectorAll('[data-nav]').forEach(function (link) {
    if (link.getAttribute('data-nav') === page) link.classList.add('is-active');
  });
})();