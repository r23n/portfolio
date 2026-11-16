const statusLines = [
  "Currently in the Go phase at Reboot01",
  "Studying Computer Science at the University of Bahrain",
  "Open to internship opportunities"
];
const statusLine = document.querySelector(".status-line");
const statusCurrent = document.querySelector(".status-current");
const statusNext = document.querySelector(".status-next");
const statusMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let statusIndex = 0;
let statusTimer;
let statusAnimations = [];

function resetStatus() {
  clearInterval(statusTimer);
  statusAnimations.forEach(function (animation) { animation.cancel(); });
  statusAnimations = [];
  statusIndex = 0;
  statusCurrent.textContent = statusLines[0];
  statusNext.textContent = "";
  statusLine.classList.remove("status-running");
  if (statusMotion.matches || !statusCurrent.animate) return;
  statusLine.classList.add("status-running");
  statusTimer = setInterval(function () {
    statusIndex = (statusIndex + 1) % statusLines.length;
    statusNext.textContent = statusLines[statusIndex];
    const options = { duration: 400, easing: "ease", fill: "forwards" };
    const outgoing = statusCurrent.animate([{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(-20px)" }], options);
    const incoming = statusNext.animate([{ opacity: 0, transform: "translateY(20px)" }, { opacity: 1, transform: "translateY(0)" }], options);
    statusAnimations = [outgoing, incoming];
    incoming.onfinish = function () {
      statusCurrent.textContent = statusLines[statusIndex];
      statusAnimations.forEach(function (animation) { animation.cancel(); });
    };
  }, 3500);
}

statusMotion.addEventListener("change", resetStatus);
if (document.documentElement.classList.contains("intro")) {
  document.addEventListener("intro-end", resetStatus, { once: true });
} else {
  resetStatus();
}
