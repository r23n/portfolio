const introScreen = document.querySelector(".intro-screen");
const introMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let introTimer;
let introTyping;
let introFlights = [];
let introEnded = false;

function endIntro() {
  if (introEnded) return;
  introEnded = true;
  clearTimeout(introTimer);
  clearInterval(introTyping);
  window.finishIntro();
  introFlights.forEach(function (animation) { animation.cancel(); });
}

function textRectangle(element, lastNode) {
  const range = document.createRange();
  if (lastNode) range.selectNodeContents(lastNode);
  else {
    range.setStartBefore(element.querySelector(".intro-name"));
    range.setEndAfter(element.querySelector(".intro-dot"));
  }
  return range.getBoundingClientRect();
}

function flyIntro() {
  if (introEnded || !document.documentElement.classList.contains("intro")) return;
  try {
    const logo = document.querySelector(".navbar-logo");
    const targetPhoto = logo.querySelector("img");
    const photo = introScreen.querySelector(".intro-photo");
    const word = introScreen.querySelector(".intro-word");
    const logoText = Array.from(logo.childNodes).find(function (node) {
      return node.nodeType === Node.TEXT_NODE && node.textContent.trim();
    });
    if (!logoText) return endIntro();
    photo.getAnimations().forEach(function (animation) { animation.cancel(); });
    const photoFrom = photo.getBoundingClientRect();
    const photoTo = targetPhoto.getBoundingClientRect();
    const wordBox = word.getBoundingClientRect();
    const textFrom = textRectangle(word);
    const textTo = textRectangle(logo, logoText);
    const scaleX = textTo.width / textFrom.width;
    const scaleY = textTo.height / textFrom.height;
    const moveX = textTo.left - wordBox.left - scaleX * (textFrom.left - wordBox.left);
    const moveY = textTo.top - wordBox.top - scaleY * (textFrom.top - wordBox.top);
    const options = { duration: 900, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" };
    photo.style.borderRadius = parseFloat(getComputedStyle(targetPhoto).borderRadius) / (photoTo.width / photoFrom.width) + "px";
    photo.style.borderWidth = 1 / (photoTo.width / photoFrom.width) + "px";
    photo.style.boxSizing = "border-box";
    introScreen.classList.add("intro-flying");
    const photoFlight = photo.animate([
      { transform: "translate(0, 0) scale(1, 1)" },
      { transform: "translate(" + (photoTo.left - photoFrom.left) + "px," + (photoTo.top - photoFrom.top) + "px) scale(" + photoTo.width / photoFrom.width + "," + photoTo.height / photoFrom.height + ")" }
    ], options);
    const wordFlight = word.animate([
      { transform: "translate(0, 0) scale(1, 1)" },
      { transform: "translate(" + moveX + "px," + moveY + "px) scale(" + scaleX + "," + scaleY + ")" }
    ], options);
    introFlights = [photoFlight, wordFlight];
    photoFlight.onfinish = endIntro;
    introTimer = setTimeout(endIntro, 950);
  } catch {
    endIntro();
  }
}

async function startIntroTyping() {
  const introName = introScreen.querySelector(".intro-name");
  const introDot = introScreen.querySelector(".intro-dot");
  const introWord = introScreen.querySelector(".intro-word");
  const logoStyle = getComputedStyle(document.querySelector(".navbar-logo"));
  introWord.style.fontFamily = logoStyle.fontFamily;
  introWord.style.fontWeight = logoStyle.fontWeight;
  introWord.style.letterSpacing = logoStyle.letterSpacing;
  const family = logoStyle.fontFamily.split(",")[0].trim();
  const font = logoStyle.fontWeight + " " + getComputedStyle(introWord).fontSize + " " + family;
  let fontTimeout;
  try {
    const loaded = await Promise.race([
      document.fonts.load(font, "ghareeb.").then(function (faces) {
        return faces.length > 0 && faces.every(function (face) { return face.status === "loaded"; });
      }),
      new Promise(function (resolve) {
        fontTimeout = setTimeout(function () { resolve(false); }, 300);
      })
    ]);
    clearTimeout(fontTimeout);
    if (!loaded) return endIntro();
  } catch {
    clearTimeout(fontTimeout);
    return endIntro();
  }
  if (introEnded || introMotion.matches || !document.documentElement.classList.contains("intro")) return;
  const photoAnimation = introScreen.querySelector(".intro-photo").getAnimations()[0];
  const introStarted = performance.now() - Number(photoAnimation?.currentTime || 0);
  let length = 0;
  introTimer = setTimeout(function () {
    introTyping = setInterval(function () {
      length++;
      introName.textContent = "ghareeb".slice(0, length);
      introDot.textContent = length === 8 ? "." : "";
      introWord.style.setProperty("--intro-cursor-x", textRectangle(introWord).width + "px");
      if (length === 8) {
        clearInterval(introTyping);
        introScreen.classList.add("intro-pausing");
        introTimer = setTimeout(flyIntro, 300);
      }
    }, 95);
  }, Math.max(0, 350 - (performance.now() - introStarted)));
}

if (document.documentElement.classList.contains("intro") && !introMotion.matches) {
  introMotion.addEventListener("change", function () {
    if (introMotion.matches) endIntro();
  });
  window.addEventListener("resize", endIntro, { once: true });
  startIntroTyping();
} else {
  if (introScreen) introScreen.remove();
}
