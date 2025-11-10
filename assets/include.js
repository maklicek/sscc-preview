(function () {
  const slots = document.querySelectorAll('[data-include]');
  if (!slots.length) return;

  // ——— Pomocná funkce: určí aktuální soubor stránky
  function currentFile() {
    const map = {
      index: 'index.html',
      sscc: 'sscc.html',
      projekty: 'projekty.html',
      spoluprace: 'spoluprace.html',
      edukace: 'edukace.html',
      konsorcium: 'konsorcium.html',
      napady: 'napady.html',
      podminky: 'terms.html'
    };
    const pageKey = (document.body.dataset.page || '').toLowerCase();
    if (map[pageKey]) return map[pageKey];

    // fallback z URL
    let file = location.pathname.split('/').pop() || 'index.html';
    if (file === '' || file === '/') file = 'index.html';
    return file;
  }

  const cur = currentFile();

  slots.forEach(async el => {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status + ' ' + res.statusText);

      // vlož HTML partialu
      const html = await res.text();
      el.insertAdjacentHTML('afterend', html);
      el.remove();

      // zvýraznění aktivní záložky – až PO vložení headeru
      const nav = document.querySelector('.main-nav');
      if (nav) {
        const links = Array.from(nav.querySelectorAll('a'));
        links.forEach(a => a.removeAttribute('aria-current'));

        // najdi link podle href konce (projekty.html apod.)
        const active =
          links.find(a => (a.getAttribute('href') || '').endsWith(cur)) ||
          links.find(a => (a.pathname.split('/').pop() || '').endsWith(cur));

        if (active) active.setAttribute('aria-current', 'page');
      }
    } catch (e) {
      console.warn('Include failed:', url, e);
    }
  });
})();
