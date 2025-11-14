// assets/js/toc-switch.js
document.addEventListener("DOMContentLoaded", () => {
  const toc = document.querySelector("#project-toc");
  if (!toc) return;

  const links  = toc.querySelectorAll("a");
  const panels = document.querySelectorAll(".project-panel");

  if (!links.length || !panels.length) return;

  function showPanel(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    // Schovat / ukázat panely
    panels.forEach(panel => {
      panel.hidden = panel !== target;
    });

    // Aktivní odkaz
    links.forEach(link => {
      const isActive = link.getAttribute("href") === targetId;
      link.classList.toggle("is-active", isActive);
    });
  }

  // Klikání na přepínače
  links.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      showPanel(targetId);

      // Posunout stránku nahoru k nadpisu projektu
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Výchozí stav – první panel
  const firstHref = links[0].getAttribute("href");
  showPanel(firstHref);
});
