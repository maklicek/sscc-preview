<script>
(function () {
  const slots = document.querySelectorAll('[data-include]');
  if (!slots.length) return;

  const base = ''; // nech prázdné (root), nebo např. '/sscc-preview'
  slots.forEach(async el => {
    const url = base + el.getAttribute('data-include');
    try {
      const res = await fetch(url, {cache: 'no-cache'});
      if (!res.ok) throw new Error(res.statusText);
      el.outerHTML = await res.text();

      // po načtení: zvýrazni aktivní odkaz v menu
      const nav = document.querySelector('.main-nav');
      if (nav) {
        const links = [...nav.querySelectorAll('a')];
        links.forEach(a => a.removeAttribute('aria-current'));
        let file = location.pathname.split('/').pop() || 'index.html';
        if (!file || file === '/') file = 'index.html';
        const active = links.find(a =>
          (a.getAttribute('href')||'').replace(/^\.\//,'') === file
        ) || links.find(a =>
          (a.pathname.split('/').pop()||'index.html') === file
        );
        if (active) active.setAttribute('aria-current','page');
      }
    } catch(e) {
      console.warn('Include failed:', url, e);
    }
  });
})();
</script>
