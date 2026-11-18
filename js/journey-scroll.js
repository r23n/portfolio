const journeyScroller = document.querySelector(".journey-scroll");
const journeyWindow = document.querySelector(".journey-window");
const journeySection = document.querySelector("#journey");
const journeyItems = document.querySelectorAll(".journey-item");
const journeyPrevious = document.querySelector(".journey-previous");
const journeyNext = document.querySelector(".journey-next");
const journeyCurrent = document.querySelector(".journey-current");
const journeyTotal = document.querySelector(".journey-total");
const journeyMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let journeyTarget = 0;
let journeyLast = journeyItems.length - 1;
let journeyMoving = false;
let journeyTimer;
let journeyNudgeObserver;

function sizeJourney() {
  const width = journeyItems[0].getBoundingClientRect().width;
  if (!width) return;
  const visible = Math.max(1, Math.floor(journeyScroller.clientWidth / width));
  journeyLast = Math.max(0, journeyItems.length - visible);
  const space = Math.max(0, journeyScroller.clientWidth - visible * width);
  document
    .querySelector(".journey-timeline")
    .style.setProperty("--journey-end-space", space + "px");
}

function journeyItemLeft(index) {
  return journeyItems[index].offsetLeft - journeyItems[0].offsetLeft;
}

function nearestJourneyItem() {
  let nearest = 0;
  let distance = Infinity;
  for (let index = 0; index <= journeyLast; index++) {
    const difference = Math.abs(
      journeyScroller.scrollLeft - journeyItemLeft(index),
    );
    if (difference < distance) {
      distance = difference;
      nearest = index;
    }
  }
  return nearest;
}

function updateJourneyFade(left, remaining) {
  const right = left + journeyScroller.clientWidth;
  let partial = 0;
  if (remaining > 1) {
    journeyItems.forEach(function (item, index) {
      const start = journeyItemLeft(index);
      const end = start + item.getBoundingClientRect().width;
      if (start < right - 1 && end > right + 1) partial = right - start;
    });
  }
  journeyWindow.style.setProperty("--journey-partial-width", partial + "px");
  journeyWindow.style.setProperty("--journey-fade-right", partial > 0 ? 1 : 0);
}

function updateJourneyControls() {
  const left = journeyScroller.scrollLeft;
  const remaining =
    journeyScroller.scrollWidth - journeyScroller.clientWidth - left;
  const first = nearestJourneyItem();
  journeyCurrent.textContent = String(first + 1).padStart(2, "0");
  journeyPrevious.disabled = left <= 1;
  journeyNext.disabled = remaining <= 1;
  if (journeyNext.disabled) journeyNext.classList.remove("is-nudging");
  updateJourneyFade(left, remaining);
}

function finishJourneyScroll() {
  journeyMoving = false;
  journeyTarget = nearestJourneyItem();
  updateJourneyControls();
}

function handleJourneyScroll() {
  updateJourneyControls();
  clearTimeout(journeyTimer);
  journeyTimer = setTimeout(finishJourneyScroll, 150);
}

function scrollJourney(direction) {
  const current = journeyMoving ? journeyTarget : nearestJourneyItem();
  journeyTarget = Math.max(0, Math.min(journeyLast, current + direction));
  journeyMoving = !journeyMotion.matches;
  journeyScroller.scrollTo({
    left: journeyItemLeft(journeyTarget),
    behavior: journeyMotion.matches ? "auto" : "smooth",
  });
}

function setupJourneyNudge() {
  if (journeyMotion.matches || !("IntersectionObserver" in window)) return;
  journeyNudgeObserver = new IntersectionObserver(
    function (entries) {
      if (
        !entries.some(function (entry) {
          return entry.isIntersecting;
        })
      )
        return;
      journeyNudgeObserver.disconnect();
      if (!journeyMotion.matches && !journeyNext.disabled)
        journeyNext.classList.add("is-nudging");
    },
    { threshold: 1 },
  );
  journeyNudgeObserver.observe(journeyNext);
  journeyNext.addEventListener("animationend", function () {
    journeyNext.classList.remove("is-nudging");
  });
}

if (journeyScroller && journeyItems.length && journeyPrevious && journeyNext) {
  try {
    journeyTotal.textContent =
      " / " + String(journeyItems.length).padStart(2, "0");
    journeyPrevious.addEventListener("click", function () {
      scrollJourney(-1);
    });
    journeyNext.addEventListener("click", function () {
      scrollJourney(1);
    });
    journeyScroller.addEventListener("scroll", handleJourneyScroll, {
      passive: true,
    });
    journeyScroller.addEventListener("scrollend", finishJourneyScroll);
    ["pointerdown", "wheel"].forEach(function (event) {
      journeyScroller.addEventListener(event, finishJourneyScroll, {
        passive: true,
      });
    });
    journeyScroller.addEventListener("keydown", function (event) {
      finishJourneyScroll();
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      scrollJourney(event.key === "ArrowRight" ? 1 : -1);
    });
    window.addEventListener("resize", function () {
      sizeJourney();
      finishJourneyScroll();
    });
    window.addEventListener("load", function () {
      sizeJourney();
      updateJourneyControls();
    });
    if (document.fonts)
      document.fonts.ready.then(function () {
        sizeJourney();
        updateJourneyControls();
      });
    journeyMotion.addEventListener("change", function () {
      if (!journeyMotion.matches) return;
      if (journeyNudgeObserver) journeyNudgeObserver.disconnect();
      journeyNext.classList.remove("is-nudging");
      journeyScroller.scrollTo({
        left: journeyItemLeft(nearestJourneyItem()),
        behavior: "auto",
      });
      finishJourneyScroll();
    });
    sizeJourney();
    updateJourneyControls();
    setupJourneyNudge();
    journeySection.classList.add("journey-ready");
  } catch {
    journeySection.classList.remove("journey-ready");
  }
}
