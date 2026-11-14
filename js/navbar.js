const navbarMenu = document.querySelector(".navbar-menu");
const navbarLinks = document.querySelector(".navbar-links");

navbarMenu.addEventListener("click", function () {
  const open = navbarLinks.classList.toggle("is-open");
  navbarMenu.setAttribute("aria-expanded", open);
});

navbarLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navbarLinks.classList.remove("is-open");
    navbarMenu.setAttribute("aria-expanded", "false");
  });
});
