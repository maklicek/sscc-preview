(function () {
  const toc = document.getElementById('toc-projects');
  const panels = document.getElementById('project-panels');
  if (!toc || !panels) return;

  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
  const panes = Array.from(panels.querySelectorAll('.project-panel'));

  function show(id) {
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
    panes.forEach(p => p.classList.toggle('is-visible', p.id === id));
  }

  // klik vlevo
  toc.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    history.replaceState(null, '', '#' + id);
    show(id);
  });

  // první načtení / změna hashe
  const initial = (location.hash || links[0]?.getAttribute('href') || '#').slice(1);
  show(initial);
  window.addEventListener('hashchange', () => show(location.hash.slice(1)));
})();
