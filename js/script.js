// Open cards popup start
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
// Open cards popup end

//Model image open start
// Grab elements
const overlay = document.getElementById("imageOverlay");
const fullscreenImg = document.getElementById("fullscreenImage");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const downloadBtn = document.getElementById("downloadBtn");

let currentGallery = [];
let currentIndex = 0;

// Attach click event to every gallery
document.querySelectorAll(".gallery-grid").forEach(gallery => {
    const images = Array.from(gallery.querySelectorAll(".gallery-img"));
    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentGallery = images;
            currentIndex = index;
            openFullscreen();
        });
    });
});

// Open full screen at a specific index
function openFullscreen() {
    fullscreenImg.src = currentGallery[currentIndex].src;
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
}

// Close full screen
function closeFullscreen() {
    overlay.style.display = "none";
    document.body.style.overflow = "";
}

// Show next image (loops back to start)
function showNext() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    fullscreenImg.src = currentGallery[currentIndex].src;
}

// Show previous image (loops to end)
function showPrev() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    fullscreenImg.src = currentGallery[currentIndex].src;
}

// Control Event Listeners
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);
closeBtn.addEventListener("click", closeFullscreen);

// Close when clicking the dark background area
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeFullscreen();
});

// Keyboard Accessibility (Left/Right Arrows and Escape key)
document.addEventListener("keydown", (e) => {
    if (overlay.style.display === "flex") {
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") closeFullscreen();
    }
});

//download open image
downloadBtn.addEventListener("click",()=> {
  const link = document.createElement("a");
  link.href = fullscreenImg.src;
  link.download = fullscreenImg.src.split("/").pop() || "image";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

//Support touch swipe on mobile
let startX = 0;

overlay.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

overlay.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) showNext();
  if (endX - startX > 50) showPrev();
});

//Model image open end

