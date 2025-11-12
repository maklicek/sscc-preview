// assets/js/include.js
(function () {
  async function loadIncludes() {
    const nodes = document.querySelectorAll('[data-include]');
    for (const node of nodes) {
      const url = node.getAttribute('data-include');
      if (!url) continue;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.statusText);
        node.innerHTML = await res.text();
      } catch (err) {
        console.warn('Include failed:', url, err);
      }
    }
  }

  // defer zajistí, že DOM je hotový, takže můžeme spustit rovnou
  loadIncludes();
})();
