const journeyScroller = document.querySelector(".journey-scroll");
const journeyWindow = document.querySelector(".journey-window");

function updateJourneyFades() {
  if (!journeyScroller || !journeyWindow) return;
  const remaining =
    journeyScroller.scrollWidth -
    journeyScroller.clientWidth -
    journeyScroller.scrollLeft;
  journeyWindow.style.setProperty(
    "--journey-fade-left",
    journeyScroller.scrollLeft > 1 ? 1 : 0,
  );
  journeyWindow.style.setProperty(
    "--journey-fade-right",
    remaining > 1 ? 1 : 0,
  );
}

if (journeyScroller) {
  journeyScroller.addEventListener("scroll", updateJourneyFades, {
    passive: true,
  });
  window.addEventListener("resize", updateJourneyFades);
  window.addEventListener("load", updateJourneyFades);
  updateJourneyFades();
}
