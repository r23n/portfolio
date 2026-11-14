const copyEmailButton = document.getElementById("copy-email");
const contactEmail = document.getElementById("contact-email");
const copyStatus = document.getElementById("copy-status");
let copyEmailTimer;

copyEmailButton.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(contactEmail.textContent);
    copyEmailButton.textContent = "copied!";
    copyStatus.textContent = "copied";
    clearTimeout(copyEmailTimer);
    copyEmailTimer = setTimeout(function () {
      copyEmailButton.textContent = "copy";
      copyStatus.textContent = "";
    }, 2000);
  } catch {
    copyEmailButton.textContent = "copy";
  }
});

