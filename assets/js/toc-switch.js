// assets/toc-switch.js
(function () {
  console.log('[TOC] script loaded');

  const nav    = document.getElementById('project-toc');
  const panels = Array.from(document.querySelectorAll('#project-panels .project-panel'));
  if (!nav || panels.length === 0) {
    console.warn('[TOC] Nenalezen nav nebo panely.');
    return;
  }

  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));

  function show(id) {
    if (!id) return;
    panels.forEach(p => p.hidden = (p.id !== id));
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
    history.replaceState(null, '', '#' + id);
  }

  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    show(a.getAttribute('href').slice(1));
  });

  // podpora Zpět/Vpřed
  window.addEventListener('hashchange', () => {
    const id = (location.hash || '').slice(1);
    if (id) show(id);
  });

  // start: hash z URL nebo první panel
  const start = (location.hash || '').slice(1) || panels[0].id;
  show(start);
})();
// assets/toc-switch.js
(function () {
  console.log('[TOC] script loaded');

  const nav    = document.getElementById('project-toc');
  const panels = Array.from(document.querySelectorAll('#project-panels .project-panel'));
  if (!nav || panels.length === 0) {
    console.warn('[TOC] Nenalezen nav nebo panely.');
    return;
  }

  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));

  function show(id) {
    if (!id) return;
    panels.forEach(p => p.hidden = (p.id !== id));
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
    history.replaceState(null, '', '#' + id);
  }

  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    show(a.getAttribute('href').slice(1));
  });

  // podpora Zpět/Vpřed
  window.addEventListener('hashchange', () => {
    const id = (location.hash || '').slice(1);
    if (id) show(id);
  });

  const start = (location.hash || '').slice(1) || panels[0].id;
  show(start);
})();
