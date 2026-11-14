const activeMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const activeLinks = document.querySelectorAll(".navbar-links a");
const activeSections = document.querySelectorAll("main section[id]");

function updateActiveLink() {
  let current = "";
  if (!activeMotion.matches) {
    const navbar = document.querySelector(".navbar");
    const position = navbar.offsetHeight + window.innerHeight * 0.25;
    activeSections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= position) current = section.id;
    });
    if (!activeSections.length && document.querySelector(".reboot-page")) current = "projects";
  }

  activeLinks.forEach(function (link) {
    const active = current !== "" && link.hash === "#" + current;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("resize", updateActiveLink);
activeMotion.addEventListener("change", updateActiveLink);
updateActiveLink();
