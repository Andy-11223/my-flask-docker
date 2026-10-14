// Accordion
document.querySelectorAll('.row-head').forEach(b => b.addEventListener('click', () => {
  const row = b.parentElement, open = row.classList.toggle('open');
  b.setAttribute('aria-expanded', open);
}));

// Count-up numbers
document.querySelectorAll('[data-count]').forEach(el => {
  const end = +el.dataset.count, t0 = performance.now(), dur = 1400;
  const tick = t => {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

// Deploy steps: line fills as you scroll
const steps = document.querySelector('.steps');
if (steps) {
  const items = [...steps.children];
  const update = () => {
    const r = steps.getBoundingClientRect(), vh = innerHeight;
    steps.style.setProperty('--p', Math.max(0, Math.min(1, (vh * .6 - r.top) / r.height)));
    items.forEach(li => li.classList.toggle('on', li.getBoundingClientRect().top < vh * .6));
  };
  addEventListener('scroll', update, { passive: true }); update();
}

// Copy buttons
document.querySelectorAll('.copy').forEach(b => b.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(b.previousElementSibling.textContent); b.textContent = 'Copied'; }
  catch { b.textContent = 'Press Ctrl+C'; }
  setTimeout(() => b.textContent = 'Copy', 1500);
}));
