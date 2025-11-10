// assets/include.js
(function () {
  // Pomocné: normalizace a zjištění aktuálního souboru z URL
  function fileFromUrl(path) {
    // /user/repo/projekty.html?x#y -> projekty.html
    const last = (path.split('/').pop() || '').split('#')[0].split('?')[0];
    return last === '' ? 'index.html' : last;
  }
  function currentFile() {
    return fileFromUrl(location.pathname);
  }

  // Najdi placeholdery pro include
  const slots = Array.from(document.querySelectorAll('[data-include]'));
  if (!slots.length) return;

  // Načti všechny partialy a vlož je do DOM
  const tasks = slots.map(async el => {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
      const html = await res.text();
      el.insertAdjacentHTML('afterend', html);
      el.remove();
    } catch (e) {
      console.warn('Include failed:', url, e);
    }
  });

  // Až jsou VŠECHNY include hotové → zvýrazni aktivní odkaz
  Promise.allSettled(tasks).then(() => {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;

    const links = Array.from(nav.querySelectorAll('a'));
    links.forEach(a => a.removeAttribute('aria-current'));

    const cur = currentFile(); // např. "sscc.html"

    // Porovnáváme jen koncové názvy souborů
    const match = links.find(a => {
      const href = a.getAttribute('href') || '';
      const fname = fileFromUrl(href); // "projekty.html" nebo "index.html"
      return fname === cur;
    });

    // Speciál: pokud jsme na indexu a žádný odkaz není přesně "index.html"
    // (např. logo vede na index), necháme bez aktivního nav — to je OK.
    if (match) match.setAttribute('aria-current', 'page');

    // Rok v patičce (pokud je)
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  });
})();
