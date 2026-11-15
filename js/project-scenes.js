const scenePanels = document.querySelectorAll(".project-scene");
const scenesMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const scenesMouse = window.matchMedia("(hover: hover) and (pointer: fine)");
let scenesObserver;

function resetSceneTilt(panel) {
  panel.style.setProperty("--tilt-x", "0deg");
  panel.style.setProperty("--tilt-y", "0deg");
  panel.style.setProperty("--spotlight", "0");
}

function setupScenes() {
  if (scenesObserver) scenesObserver.disconnect();
  scenePanels.forEach(function (panel) {
    panel.classList.remove("scenes-ready", "scene-running");
    resetSceneTilt(panel);
  });
  if (scenesMotion.matches || !("IntersectionObserver" in window)) return;
  scenesObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      entry.target.classList.toggle("scene-running", entry.isIntersecting && !document.hidden);
    });
  });
  scenePanels.forEach(function (panel) {
    panel.classList.add("scenes-ready");
    scenesObserver.observe(panel);
  });
}

scenePanels.forEach(function (panel) {
  panel.addEventListener("pointermove", function (event) {
    if (scenesMotion.matches || !scenesMouse.matches || event.pointerType === "touch") return;
    const rect = panel.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    panel.style.setProperty("--mouse-x", x * 100 + "%");
    panel.style.setProperty("--mouse-y", y * 100 + "%");
    panel.style.setProperty("--tilt-x", (0.5 - y) * 5 + "deg");
    panel.style.setProperty("--tilt-y", (x - 0.5) * 5 + "deg");
    panel.style.setProperty("--spotlight", "1");
  });
  panel.addEventListener("pointerleave", function () { resetSceneTilt(panel); });
});

scenesMotion.addEventListener("change", setupScenes);
scenesMouse.addEventListener("change", function () {
  scenePanels.forEach(resetSceneTilt);
});
document.addEventListener("visibilitychange", function () {
  scenePanels.forEach(function (panel) {
    const rect = panel.getBoundingClientRect();
    panel.classList.toggle("scene-running", !document.hidden && !scenesMotion.matches && rect.bottom > 0 && rect.top < window.innerHeight);
  });
});
setupScenes();
