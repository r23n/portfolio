function startIntroLabels() {
  const labelMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const sectionLabels = document.querySelectorAll(".section-label");
  const labelTimers = [];

  function resetLabel(label) {
    label.classList.remove("label-typing");
    label
      .querySelectorAll(".label-output, .label-cursor")
      .forEach(function (element) {
        element.remove();
      });
  }

  if (!labelMotion.matches && "IntersectionObserver" in window) {
    const labelObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const label = entry.target;
          labelObserver.unobserve(label);
          if (labelMotion.matches) return;

          try {
            const text = label.querySelector(".label-full").textContent;
            const output = document.createElement("span");
            output.className = "label-output";
            output.setAttribute("aria-hidden", "true");
            const cursor = document.createElement("span");
            cursor.className = "label-cursor";
            cursor.setAttribute("aria-hidden", "true");
            label.append(output, cursor);
            let length = 0;
            const timer = setInterval(function () {
              length++;
              output.textContent = text.slice(0, length);
              label.style.setProperty("--label-length", length);
              if (length === text.length) clearInterval(timer);
            }, 100);
            labelTimers.push(timer);
            label.classList.add("label-typing");
          } catch {
            resetLabel(label);
          }
        });
      },
      { threshold: 0.5 },
    );

    sectionLabels.forEach(function (label) {
      labelObserver.observe(label);
    });
    labelMotion.addEventListener("change", function () {
      if (!labelMotion.matches) return;
      labelObserver.disconnect();
      labelTimers.forEach(clearInterval);
      sectionLabels.forEach(function (label) {
        resetLabel(label);
      });
    });
  }
}

if (document.documentElement.classList.contains("intro")) {
  document.addEventListener("intro-end", startIntroLabels, { once: true });
} else {
  startIntroLabels();
}
