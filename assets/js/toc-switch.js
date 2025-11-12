// assets/toc-switch.js
(function () {
  window.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('project-toc');
    if (!nav) return;

    const links  = Array.from(nav.querySelectorAll('a[href^="#"]'));
    const panels = Array.from(document.querySelectorAll('#project-panels .project-panel'));

    function show(id) {
      if (!id) return;

      // přepínání panelů
      panels.forEach(panel => {
        const on = panel.id === id;
        panel.hidden = !on;
        panel.classList.toggle('is-visible', on);
      });

      // aktivní odkaz vlevo
      links.forEach(a => {
        const targetId = a.getAttribute('href').slice(1);
        a.classList.toggle('is-active', targetId === id);
      });

      // hash v URL (nevadí, když se .html schová)
      if (history.replaceState) {
        history.replaceState(null, '', '#' + id);
      }
    }

    // kliknutí v levém TOC
    nav.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      show(id);
    });

    // Start – použij hash z URL, nebo první panel
    const startId =
      (location.hash || '').slice(1) ||
      (panels[0] && panels[0].id);

    if (startId) show(startId);
  });
})();
