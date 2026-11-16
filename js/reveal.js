function startIntroReveals() {
  const revealMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!revealMotion.matches && "IntersectionObserver" in window) {
    try {
      const revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.1 },
      );

      const revealTargets = document.querySelectorAll(
        "section:not(#home) > .container, .reboot-list > .container, .about-stat, .journey-item, .volunteering-row, .reboot-project",
      );
      document
        .querySelectorAll(
          ".about-stats, .journey-timeline, .volunteering-list, .reboot-list > .container",
        )
        .forEach(function (group) {
          const items = group.querySelectorAll(
            ".about-stat, .journey-item, .volunteering-row, .reboot-project",
          );
          items.forEach(function (item, index) {
            item.style.setProperty(
              "--reveal-delay",
              Math.min(index, 4) * 80 + "ms",
            );
          });
        });

      revealTargets.forEach(function (target) {
        if (target.getBoundingClientRect().top < window.innerHeight) return;
        revealObserver.observe(target);
        target.classList.add("reveal");
      });
      document.documentElement.classList.add("js");

      revealMotion.addEventListener("change", function () {
        if (!revealMotion.matches) return;
        revealObserver.disconnect();
        revealTargets.forEach(function (target) {
          target.classList.add("is-visible");
        });
      });
    } catch {
      document.documentElement.classList.remove("js");
    }
  }
}

if (document.documentElement.classList.contains("intro")) {
  document.addEventListener("intro-end", startIntroReveals, { once: true });
} else {
  startIntroReveals();
}
