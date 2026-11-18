const progressTracker = document.querySelector(".progress-tracker");
const trackerMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const trackerTimers = [];
let trackerObserver;
let trackerStarted = false;

function finishTracker() {
  trackerTimers.forEach(clearTimeout);
  progressTracker.classList.remove("tracker-playing");
  progressTracker
    .querySelectorAll("[data-completed]")
    .forEach(function (count) {
      count.textContent = count.dataset.completed;
    });
}

function animateTracker() {
  if (trackerStarted || trackerMotion.matches) return;
  trackerStarted = true;
  try {
    progressTracker
      .querySelectorAll(".tracker-panel")
      .forEach(function (panel) {
        const count = panel.querySelector("[data-completed]");
        count.textContent = "0";
        panel
          .querySelectorAll(".tracker-segment-completed")
          .forEach(function (segment, index) {
            segment.style.setProperty("--tracker-delay", index * 180 + "ms");
            trackerTimers.push(
              setTimeout(
                function () {
                  count.textContent = index + 1;
                },
                index * 180 + 350,
              ),
            );
          });
      });
    progressTracker.classList.add("tracker-playing");
  } catch {
    finishTracker();
  }
}

if (
  progressTracker &&
  !trackerMotion.matches &&
  "IntersectionObserver" in window
) {
  try {
    trackerObserver = new IntersectionObserver(
      function (entries) {
        if (
          !entries.some(function (entry) {
            return entry.isIntersecting;
          })
        )
          return;
        trackerObserver.disconnect();
        animateTracker();
      },
      { threshold: 0.1 },
    );
    trackerObserver.observe(progressTracker);
    trackerMotion.addEventListener("change", function () {
      if (!trackerMotion.matches) return;
      trackerObserver.disconnect();
      finishTracker();
    });
  } catch {
    finishTracker();
  }
}
