(function(){
  const pane = document.getElementById('projectsPane');
  if (!pane) return;

  const links = [...document.querySelectorAll('.toc-link')];
  const sections = [...pane.querySelectorAll('.project[id]')];

  function show(id){
    sections.forEach(s => s.classList.toggle('is-active', '#'+s.id === id));
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === id));
    history.replaceState(null, '', id);
    pane.scrollTop = 0;
  }

  links.forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id.startsWith('#')) return;
      e.preventDefault();
      show(id);
    });
  });

  // Po načtení: zobraz sekci podle URL nebo první
  const start = sections.some(s => '#'+s.id === location.hash)
    ? location.hash
    : '#'+sections[0].id;
  show(start);
})();
