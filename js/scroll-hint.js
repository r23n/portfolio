const scrollHint = document.querySelector(".scroll-hint");

function updateScrollHint() {
  const hidden = window.scrollY > 100;
  scrollHint.classList.toggle("is-hidden", hidden);
  scrollHint.inert = hidden;
}

if (scrollHint) {
  window.addEventListener("scroll", updateScrollHint, { passive: true });
  updateScrollHint();
}
