const titles = ["Software Developer", "Computer Science Student", "Volunteer"];
const typingText = document.getElementById("typing-text");
let titleIndex = 0;
let characterIndex = titles[0].length;
let deleting = true;

function typeTitle() {
  const title = titles[titleIndex];
  characterIndex += deleting ? -1 : 1;
  typingText.textContent = title.slice(0, characterIndex);
  let delay = deleting ? 50 : 100;

  if (!deleting && characterIndex === title.length) {
    deleting = true;
    delay = 1800;
  } else if (deleting && characterIndex === 0) {
    deleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    delay = 300;
  }

  setTimeout(typeTitle, delay);
}

setTimeout(typeTitle, 1800);
