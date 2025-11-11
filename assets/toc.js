// Aktivní link v TOC podle právě viditelné sekce
(function () {
  const toc = document.querySelector('.toc');
  if (!toc) return;

  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
  const targets = links
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  // zvýraznění po kliknutí (funguje i bez IntersectionObserveru)
  links.forEach(a => {
    a.addEventListener('click', () => {
      links.forEach(x => x.removeAttribute('aria-current'));
      a.setAttribute('aria-current', 'true');
    });
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      // vyber nejvýše viditelný
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      const id = visible.target.id;
      links.forEach(a => {
        a.setAttribute('aria-current', a.getAttribute('href') === '#' + id ? 'true' : 'false');
      });
    }, {
      rootMargin: '-30% 0px -60% 0px',  // „aktivní“ když je cca horní třetina
      threshold: [0, 0.25, 0.5, 1]
    });

    targets.forEach(t => io.observe(t));
  }
})();
<script src="assets/toc.js" defer></script>
