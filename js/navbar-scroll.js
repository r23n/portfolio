const scrollNavbar = document.querySelector(".navbar");
const navbarScrollMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateNavbarScroll() {
  if (!scrollNavbar) return;
  const progress = navbarScrollMotion.matches ? 0 : Math.min(1, Math.max(0, window.scrollY / 200));
  scrollNavbar.style.setProperty("--navbar-top", 100 - progress * 5 + "%");
  scrollNavbar.style.setProperty("--navbar-bottom", 100 - progress * 15 + "%");
  scrollNavbar.style.setProperty("--navbar-border", 100 - progress * 100 + "%");
  scrollNavbar.style.setProperty("--navbar-blur", progress * 10 + "px");
  scrollNavbar.classList.add("navbar-scroll");
}

window.addEventListener("scroll", updateNavbarScroll, { passive: true });
navbarScrollMotion.addEventListener("change", updateNavbarScroll);
updateNavbarScroll();
