// Smooth scroll po kliknutí
document.querySelectorAll('.toc-link').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href') || '';
    if (id.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', id); // mění hash bez skoku
      }
    }
  });
});

// ScrollSpy – zvýrazni aktivní sekci v TOC
const links = Array.from(document.querySelectorAll('.toc-link'));
const map = new Map(links.map(a => [a.getAttribute('href'), a]));

const io = new IntersectionObserver((entries) => {
  // hledáme sekci nejvýš v viewportu
  let best = null;
  entries.forEach(en => {
    if (en.isIntersecting) {
      if (!best || en.boundingClientRect.top < best.boundingClientRect.top) best = en;
    }
  });
  if (best) {
    const id = '#' + best.target.id;
    links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === id));
  }
}, { rootMargin: '-30% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] });

// napojíme na všechny .project sekce
document.querySelectorAll('.project[id]').forEach(sec => io.observe(sec));
