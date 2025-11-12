(function () {
  const toc = document.querySelector('#toc-projects');
  const panelsWrap = document.querySelector('#project-panels');
  if (!toc || !panelsWrap) return;

  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
  const panels = Array.from(panelsWrap.querySelectorAll('.project-panel'));

  function getTargetFromHash() {
    const id = (location.hash || '').trim();
    if (!id) return null;
    const panel = panels.find(p => '#' + p.id === id);
    return panel || null;
  }

  function showPanel(panel) {
    if (!panel) return;

    // 1) zruš aktivní stav
    panels.forEach(p => {
      p.classList.remove('is-visible');
    });

    // odstranění aria-current z TOC
    links.forEach(a => a.removeAttribute('aria-current'));

    // 2) po krátké chvíli skryj ostatní a aktivuj cílový
    window.requestAnimationFrame(() => {
      panels.forEach(p => p.classList.remove('is-active'));
      panel.classList.add('is-active');

      // navázání správného odkazového zvýraznění
      const activeLink = links.find(a => a.getAttribute('href') === '#' + panel.id);
      if (activeLink) activeLink.setAttribute('aria-current', 'page');

      // 3) vizuální fade-in
      window.requestAnimationFrame(() => {
        panel.classList.add('is-visible');
      });
    });
  }

  // Kliknutí vlevo v TOC
  toc.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    e.preventDefault();
    const id = a.getAttribute('href');
    const target = panels.find(p => '#' + p.id === id);
    if (!target) return;

    // pushState, aby šlo sdílet odkaz a fungovalo zpět/vpřed
    history.pushState({ t: id }, '', id);
    showPanel(target);
  });

  // Inicializace podle hash (nebo první položky)
  function init() {
    const initial = getTargetFromHash() || panels[0];
    if (!initial) return;
    showPanel(initial);
  }

  // Reakce na tlačítko zpět/vpřed
  window.addEventListener('popstate', () => {
    const target = getTargetFromHash() || panels[0];
    showPanel(target);
  });

  init();
})();
