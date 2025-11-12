(function () {
  // najdi kontejner TOC
  const nav =
    document.querySelector('#project-toc, .project-toc, .toc-nav, .toc, [data-toc]');
  if (!nav) return;

  const links  = Array.from(nav.querySelectorAll('a[href^="#"], a[data-target]'));
  const panels = Array.from(document.querySelectorAll('#project-panels .project-panel'));

  const idFromLink = (a) => (a.dataset?.target || (a.hash || '').replace(/^#/, ''));

  function show(id) {
    if (!id) return;

    // aktivuj odkaz
    links.forEach(a => a.classList.toggle('is-active', idFromLink(a) === id));

    // přepni panely
    let found = false;
    panels.forEach(p => {
      const on = p.id === id;
      p.hidden = !on;
      p.classList.toggle('is-visible', on);
      if (on) found = true;
    });

    // permalink
    if (found) history.replaceState(null, '', '#' + id);
  }

  // delegace kliků
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"], a[data-target]');
    if (!a) return;
    e.preventDefault();
    show(idFromLink(a));
  });

  // start: hash z URL, jinak první odkaz
  const start = (location.hash || '').slice(1) || (links[0] && idFromLink(links[0]));
  if (start) show(start);
})();
