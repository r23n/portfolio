const copyEmailButton = document.getElementById("copy-email");
const contactEmail = document.getElementById("contact-email");
let copyEmailTimer;

copyEmailButton.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(contactEmail.textContent);
    copyEmailButton.textContent = "copied!";
    clearTimeout(copyEmailTimer);
    copyEmailTimer = setTimeout(function () {
      copyEmailButton.textContent = "copy";
    }, 2000);
  } catch {
    copyEmailButton.textContent = "copy";
  }
});
