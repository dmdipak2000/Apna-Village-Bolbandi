// Open cards popup
const openButtons = [
  { btn: "#openModel", popup: ".pop-up-container" },
  { btn: "#openModel-2", popup: ".pop-up-container2" },
  { btn: "#openModel-3", popup: ".pop-up-container3" },
  { btn: "#openModel-4", popup: ".pop-up-container4" }
];

openButtons.forEach(item => {
  document.querySelector(item.btn).addEventListener("click", () => {
    document.querySelector(item.popup).classList.add("active");
  });
});

// Close all card popups
document.querySelectorAll(".closeModel").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    document.querySelectorAll(
      ".pop-up-container, .pop-up-container2, .pop-up-container3, .pop-up-container4"
    ).forEach(popup => {
      popup.classList.remove("active");
    });
  });
});