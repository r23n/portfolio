const progressMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const progressBar = document.querySelector(".scroll-progress-track > .scroll-progress");

function updateProgress() {
  if (progressMotion.matches) return;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    height > 0 ? Math.max(0, Math.min(1, window.scrollY / height)) : 0;
  progressBar.style.transform = "scaleX(" + progress + ")";
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
window.addEventListener("load", updateProgress);
progressMotion.addEventListener("change", updateProgress);
updateProgress();
