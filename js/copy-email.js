const copyEmailButton = document.getElementById("copy-email");
const contactEmail = document.getElementById("contact-email");
const copyStatus = document.getElementById("copy-status");
const copyEmailLabel = document.getElementById("copy-email-label");
let copyEmailTimer;

copyEmailButton.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(contactEmail.textContent);
    copyEmailLabel.textContent = "copied!";
    copyStatus.textContent = "copied";
    clearTimeout(copyEmailTimer);
    copyEmailTimer = setTimeout(function () {
      copyEmailLabel.textContent = "copy";
      copyStatus.textContent = "";
    }, 2000);
  } catch {
    copyEmailLabel.textContent = "copy";
  }
});

