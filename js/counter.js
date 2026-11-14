const counters = document.querySelectorAll(".about-number");
const counterMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!counterMotion.matches && "IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = Number(counter.dataset.count);
      counterObserver.unobserve(counter);
      if (counterMotion.matches) return;
      let count = 0;
      const timer = setInterval(function () {
        count++;
        counter.textContent = counterMotion.matches ? target : count;
        if (counterMotion.matches || count >= target) clearInterval(timer);
      }, 1000 / target);
      counter.textContent = "0";
    });
  }, { threshold: 0.5 });

  counters.forEach(function (counter) {
    counterObserver.observe(counter);
  });
}
