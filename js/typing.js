const titles = ["Software Developer", "Computer Science Student", "Volunteer"];
const typingText = document.getElementById("typing-text");
const typingMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let titleIndex = 0;
let characterIndex = titles[0].length;
let deleting = true;
let typingTimer;

function typeTitle() {
  if (typingMotion.matches) return;
  const title = titles[titleIndex];
  characterIndex += deleting ? -1 : 1;
  typingText.textContent = title.slice(0, characterIndex);
  typingText.parentElement.style.setProperty("--typing-length", characterIndex);
  let delay = deleting ? 50 : 100;

  if (!deleting && characterIndex === title.length) {
    deleting = true;
    delay = 1800;
  } else if (deleting && characterIndex === 0) {
    deleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    delay = 300;
  }

  typingTimer = setTimeout(typeTitle, delay);
}

function resetTyping() {
  clearTimeout(typingTimer);
  typingText.textContent = titles[0];
  typingText.parentElement.style.setProperty("--typing-length", titles[0].length);
  titleIndex = 0;
  characterIndex = titles[0].length;
  deleting = true;
  if (!typingMotion.matches) typingTimer = setTimeout(typeTitle, 1800);
}

if (typingText) {
  typingMotion.addEventListener("change", resetTyping);
  if (document.documentElement.classList.contains("intro")) {
    document.addEventListener("intro-end", resetTyping, { once: true });
  } else {
    resetTyping();
  }
}
