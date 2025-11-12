(function () {
  const links  = document.querySelectorAll('.toc-link[data-target]');
  const panels = document.querySelectorAll('.project-panel');

  function show(id) {
    panels.forEach(p => p.classList.toggle('is-visible', p.id === id));
    links.forEach(a => a.classList.toggle('is-active', a.dataset.target === id));
  }

  links.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.dataset.target;
      show(id);
      // aby šel sdílet přímý odkaz
      history.replaceState(null, '', '#' + id);
    });
  });

  // start – vezmi hash nebo první položku
  const first = (location.hash || '').replace('#','') || (links[0] && links[0].dataset.target);
  if (first) show(first);
})();
