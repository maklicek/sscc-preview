(function () {
  const nav =
    document.querySelector('#project-toc, .project-toc, .toc-nav, .toc, [data-toc]');
  if (!nav) return;

  const links  = Array.from(nav.querySelectorAll('a[href^="#"], a[data-target]'));
  const panels = Array.from(document.querySelectorAll('#project-panels .project-panel'));

  const idFromLink = (a) => (a.dataset?.target || (a.hash || '').replace(/^#/, ''));

  function show(id) {
    if (!id) return;
    links.forEach(a => a.classList.toggle('is-active', idFromLink(a) === id));
    let found = false;
    panels.forEach(p => {
      const on = p.id === id;
      p.hidden = !on;
      p.classList.toggle('is-visible', on);
      if (on) found = true;
    });
    if (found) history.replaceState(null, '', '#' + id);
  }

  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"], a[data-target]');
    if (!a) return;
    e.preventDefault();
    show(idFromLink(a));
  });

  const start = (location.hash || '').slice(1) || (links[0] && idFromLink(links[0]));
  if (start) show(start);
})();
