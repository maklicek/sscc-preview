// assets/js/toc-switch.js
(function () {
  const nav    = document.getElementById('project-toc');
  if (!nav) return;

  const links  = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const panels = Array.from(document.querySelectorAll('#project-panels .project-panel'));

  function idFromLink(a) {
    return (a.getAttribute('href') || '').replace(/^#/, '');
  }

  function show(id) {
    if (!id) return;

    let found = false;

    // přepni aktivní odkaz
    links.forEach(a => {
      const active = idFromLink(a) === id;
      a.classList.toggle('is-active', active);
    });

    // přepni panely
    panels.forEach(p => {
      const on = p.id === id;
      p.hidden = !on;
      p.classList.toggle('is-visible', on);
      if (on) found = true;
    });

    if (found) {
      history.replaceState(null, '', '#' + id);
    }
  }

  // kliknutí v levém TOC
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    show(idFromLink(a));
  });

  // start – hash v URL nebo první panel
  const start = (location.hash || '').slice(1) || (panels[0] && panels[0].id);
  if (start) show(start);
})();
