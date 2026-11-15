const deckLink = document.querySelector(".projects-collection");
const deckMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (deckLink && !deckMotion.matches && window.matchMedia("(hover: none)").matches && "IntersectionObserver" in window) {
  const deckObserver = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    deckObserver.disconnect();
    if (deckMotion.matches) return;
    deckLink.classList.add("deck-spread");
    setTimeout(function () { deckLink.classList.remove("deck-spread"); }, 1800);
  }, { threshold: 0.3 });
  deckObserver.observe(deckLink);
  deckMotion.addEventListener("change", function () {
    if (deckMotion.matches) deckLink.classList.remove("deck-spread");
  });
}
