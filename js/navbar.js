const navbarMenu = document.querySelector(".navbar-menu");
const navbarLinks = document.querySelector(".navbar-links");
const navbarIndicator = document.createElement("span");
navbarIndicator.className = "navbar-indicator";
navbarIndicator.setAttribute("aria-hidden", "true");
navbarLinks.prepend(navbarIndicator);

function updateNavbarIndicator() {
  const active = navbarLinks.querySelector("a.is-active");
  if (!active || !navbarLinks.getClientRects().length) {
    navbarIndicator.hidden = true;
    return;
  }
  navbarIndicator.hidden = false;
  navbarIndicator.style.width = active.offsetWidth + "px";
  navbarIndicator.style.height = active.offsetHeight + "px";
  navbarIndicator.style.transform =
    "translate(" + active.offsetLeft + "px," + active.offsetTop + "px)";
  navbarLinks.classList.add("has-indicator");
}

function closeNavbarMenu() {
  navbarLinks.classList.remove("is-open");
  navbarMenu.setAttribute("aria-expanded", "false");
}

navbarMenu.addEventListener("click", function () {
  const open = navbarLinks.classList.toggle("is-open");
  navbarMenu.setAttribute("aria-expanded", open);
  updateNavbarIndicator();
});
document.querySelectorAll(".navbar-links a, .navbar-actions .navbar-talk").forEach(function (link) {
  link.addEventListener("click", closeNavbarMenu);
});
navbarLinks.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeNavbarMenu();
    navbarMenu.focus();
  }
});
document.addEventListener("navbar-active-change", updateNavbarIndicator);
window.addEventListener("resize", updateNavbarIndicator);
window.addEventListener("load", updateNavbarIndicator);
if (document.fonts) document.fonts.ready.then(updateNavbarIndicator);
document.querySelector(".navbar").classList.add("navbar-ready");
updateNavbarIndicator();
