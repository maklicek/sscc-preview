// assets/js/toc-switch.js

window.addEventListener('DOMContentLoaded', function () {
  // najdi kontejner levého TOC
  const nav = document.getElementById('project-toc');
  if (!nav) return;

  // odkazy vlevo
  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));

  // panely vpravo
  const panels = Array.from(
    document.querySelectorAll('#project-panels .project-panel')
  );

  function show(id) {
    if (!id) return;

    let found = false;

    // přepni panely
    panels.forEach(panel => {
      const on = panel.id === id;
      panel.hidden = !on;                 // atribut hidden
      panel.classList.toggle('is-visible', on);
      if (on) found = true;
    });

    // aktivní odkaz vlevo
    links.forEach(a => {
      const hrefId = (a.hash || '').slice(1);
      a.classList.toggle('is-active', hrefId === id);
    });

    if (found) {
      // čistý hash v URL
      history.replaceState(null, '', '#' + id);
    }
  }

  // kliky v levém menu
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    const id = (a.hash || '').slice(1);
    show(id);
  });

  // start – hash z URL, nebo první panel podle pořadí
  const startId =
    (location.hash || '').slice(1) ||
    (panels[0] && panels[0].id);

  if (startId) show(startId);
});
