(function () {
  // Najdi navigaci – preferuj #project-toc, jinak první .toc-nav
  const nav =
    document.getElementById('project-toc') ||
    document.querySelector('.toc-nav');
  if (!nav) {
    console.warn('Project TOC nenalezen.');
    return;
  }

  // Odkazy v TOC – bereme a[data-target] i a[href^="#"]
  const links = nav.querySelectorAll('a[data-target], a[href^="#"]');

  // Panely – ber vše s .project-panel (v rámci #project-panels, ale i fallback)
  const panels =
    document.querySelectorAll('#project-panels .project-panel, .project-panel');

  function idFromLink(a) {
    const t = a.dataset.target || (a.getAttribute('href') || '').replace(/^.*#/, '');
    return t;
  }

  function show(id) {
    if (!id) return;

    // Aktivuj správný odkaz
    links.forEach(a => a.classList.toggle('is-active', idFromLink(a) === id));

    // Schovej / ukaž panely
    let found = false;
    panels.forEach(p => {
      const on = p.id === id;
      p.hidden = !on;
      if (on) found = true;
    });

    // Permalink do URL
    if (found) history.replaceState(null, '', '#' + id);
  }

  // Delegace kliknutí v levém TOC
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-target], a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    show(idFromLink(a));
  });

  // Start: hash z URL, jinak první odkaz
  const start = (location.hash || '').slice(1) || (links[0] && idFromLink(links[0]));
  if (start) show(start);
})();
