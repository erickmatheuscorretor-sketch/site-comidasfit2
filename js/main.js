// =============================================
// COUNTDOWN TIMER – persiste via localStorage
// Dura 4 horas a partir da primeira visita
// =============================================
(function () {
  const DURATION_MS = 4 * 60 * 60 * 1000; // 4 horas
  const KEY = 'recetas365_deadline';

  let deadline = parseInt(localStorage.getItem(KEY) || '0', 10);
  if (!deadline || deadline < Date.now()) {
    deadline = Date.now() + DURATION_MS;
    localStorage.setItem(KEY, deadline);
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function setAll(h, m, s) {
    ['cd-hours', 'cd-mins', 'cd-secs',
     'mc-hours', 'mc-mins', 'mc-secs'].forEach(function (id, i) {
      const el = document.getElementById(id);
      if (!el) return;
      el.textContent = pad([h, m, s, h, m, s][i]);
    });
  }

  function tick() {
    const diff = Math.max(0, deadline - Date.now());
    const totalSecs = Math.floor(diff / 1000);
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    setAll(h, m, s);

    if (diff <= 0) {
      // Reinicia para criar sensação de urgência contínua
      deadline = Date.now() + DURATION_MS;
      localStorage.setItem(KEY, deadline);
    }
  }

  tick();
  setInterval(tick, 1000);
})();

// =============================================
// SCROLL SUAVE PARA LINKS INTERNOS
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// =============================================
// FADE-IN AO ROLAR (Intersection Observer)
// =============================================
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll(
  '.recibir-card, .pq-item, .incluye-card, .faq-item, .garantia-inner, .comprar-box'
).forEach(function (el) {
  el.classList.add('fade-in');
  observer.observe(el);
});
