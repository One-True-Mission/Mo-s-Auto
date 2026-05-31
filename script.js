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

/* Gallery carousel: peek / featured, 5-state class-driven (own IIFE) */
(function () {
  var root = document.querySelector('[data-carousel]');
  if (!root) return;
  var slides = Array.prototype.slice.call(root.querySelectorAll('.car-slide'));
  var total = slides.length;
  if (total < 2) return;

  var dotsWrap = root.querySelector('.car-dots');
  var prevBtn = root.querySelector('.car-prev');
  var nextBtn = root.querySelector('.car-next');
  var current = 0;
  var timer = null;
  var DELAY = 2000;

  var dots = [];
  if (dotsWrap) {
    for (var i = 0; i < total; i++) {
      var d = document.createElement('button');
      d.className = 'car-dot';
      d.setAttribute('aria-label', 'Go to photo ' + (i + 1));
      (function (idx) { d.addEventListener('click', function () { go(idx); restart(); }); })(i);
      dotsWrap.appendChild(d);
      dots.push(d);
    }
  }

  function render() {
    var half = Math.floor(total / 2);
    slides.forEach(function (slide, idx) {
      var rel = (idx - current + total) % total;
      var cls = 'car-slide';
      if (rel === 0) cls += ' is-active';
      else if (rel === 1) cls += ' is-next';
      else if (rel === total - 1) cls += ' is-prev';
      else if (rel <= half) cls += ' is-far-right';
      else cls += ' is-far-left';
      slide.className = cls;
    });
    dots.forEach(function (dot, idx) {
      dot.classList.toggle('is-active', idx === current);
    });
  }

  function go(idx) { current = (idx + total) % total; render(); }
  function next() { go(current + 1); }
  function prev() { go(current - 1); }
  function start() { timer = setInterval(next, DELAY); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }

  slides.forEach(function (slide, idx) {
    slide.addEventListener('click', function () {
      if (slide.classList.contains('is-prev')) { prev(); restart(); }
      else if (slide.classList.contains('is-next')) { next(); restart(); }
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('touchstart', stop, { passive: true });
  root.addEventListener('touchend', start, { passive: true });

  document.addEventListener('keydown', function (e) {
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key === 'ArrowRight') { next(); restart(); }
    else if (e.key === 'ArrowLeft') { prev(); restart(); }
  });

  var sx = 0;
  root.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  root.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) { if (dx < 0) next(); else prev(); restart(); }
  }, { passive: true });

  render();
  start();
})();