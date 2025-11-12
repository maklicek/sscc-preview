// assets/js/toc-switch.js

window.addEventListener('DOMContentLoaded', function () {
  const nav    = document.getElementById('project-toc');
  if (!nav) return;

  const links  = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const panels = Array.from(document.querySelectorAll('#project-panels .project-panel'));

  function idFromLink(a) {
    return (a.hash || '').replace(/^#/, '');
  }

  function show(id) {
    if (!id) return;

    // panely: nastav is-active
    panels.forEach(panel => {
      const on = panel.id === id;
      panel.classList.toggle('is-active', on);
    });

    // odkazy vlevo: is-active
    links.forEach(a => {
      a.classList.toggle('is-active', idFromLink(a) === id);
    });

    // aktualizace URL hashe (jen kosmetika)
    history.replaceState(null, '', '#' + id);
  }

  // kliky v levém menu
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    show(idFromLink(a));
  });

  // start – hash z URL nebo DAC
  const start = (location.hash || '').slice(1) || 'proj-dac';
  show(start);
});
