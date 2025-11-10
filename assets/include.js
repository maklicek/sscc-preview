(function () {
  const slots = document.querySelectorAll('[data-include]');
  if (!slots.length) return;

  slots.forEach(async el => {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
      el.outerHTML = await res.text();

      // po vložení headeru zvýrazni aktivní položku
      const nav = document.querySelector('.main-nav');
      if (nav) {
        const links = Array.from(nav.querySelectorAll('a'));
        links.forEach(a => a.removeAttribute('aria-current'));
        let file = location.pathname.split('/').pop() || 'index.html';
        if (!file || file === '/') file = 'index.html';
        const active =
          links.find(a => (a.getAttribute('href') || '') === file) ||
          links.find(a => (a.pathname.split('/').pop() || '') === file);
        if (active) active.setAttribute('aria-current', 'page');
      }
    } catch (e) {
      console.warn('Include failed:', url, e);
    }
  });
})();
