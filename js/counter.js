const counters = document.querySelectorAll(".about-number");

const counterObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = Number(counter.dataset.count);
    let count = 0;
    counter.textContent = count;
    counterObserver.unobserve(counter);

    const timer = setInterval(function () {
      count++;
      counter.textContent = count;
      if (count === target) clearInterval(timer);
    }, 1000 / target);
  });
}, { threshold: 0.5 });

counters.forEach(function (counter) {
  counter.textContent = "0";
  counterObserver.observe(counter);
});
