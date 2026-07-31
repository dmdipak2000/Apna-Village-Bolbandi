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

//Support touch swipe model image on mobile
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

// Card Search Start
const searchBox = document.getElementById("searchBox");
const sections = document.querySelectorAll(".card-section");
// const noCardMessage = document.getElementById("noCardMessage");

//Pop-up Elements
const popup = document.getElementById("noCardPopup");
const closePopup = document.getElementById("closePopup");

let popupTimer;

function showPopup() {
    popup.style.display = "flex";
    clearTimeout(popupTimer);
    popupTimer = setTimeout(() => {
        popup.style.display = "none";
    }, 5000);
}

closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});

searchBox.addEventListener("input", function () {

    const keyword = this.value.trim().toLowerCase();

    // Reset everything if search box is empty
    if (keyword === "") {
        sections.forEach(section => {
            section.querySelectorAll(".card").forEach(card => {
                card.style.display = "";
            });
        });

        // noCardMessage.style.display = "none";
        popup.style.display = "none";
        return;
    }

    let found = false;
    let firstMatch = null;

    // Restore all cards first
    sections.forEach(section => {
        section.querySelectorAll(".card").forEach(card => {
            card.style.display = "";
        });
    });

    // Find the matching section
    sections.forEach(section => {

        let sectionMatched = false;

        section.querySelectorAll(".card").forEach(card => {

            const title = card.querySelector(".card-title").textContent.toLowerCase();

            if (title.includes(keyword)) {
                sectionMatched = true;
                found = true;

                if (!firstMatch) {
                    firstMatch = card;
                }
            }

        });

        // Only filter the matched section
        if (sectionMatched) {

            section.querySelectorAll(".card").forEach(card => {

                const title = card.querySelector(".card-title").textContent.toLowerCase();

                card.style.display = title.includes(keyword) ? "" : "none";

            });

        }

    });
    // Add a variable to remember the last searched keyword
    let lastKeyword = "";

    if (firstMatch && keyword !== lastKeyword) {
        lastKeyword = keyword;
        
        firstMatch.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    // if (firstMatch) {
    //     firstMatch.scrollIntoView({
    //         behavior: "smooth",
    //         block: "center"
    //     });
    // }

    // noCardMessage.style.display = found ? "none" : "block";

    if (!found) {
        showPopup();
    } else {
        popup.style.display = "none";
    }
});
// Press enter to search
searchBox.addEventListener("keypress",function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        //Trigger the existing search
        searchBox.dispatchEvent(new Event("input"));
        //Remove keyboard focus (optional)
        this.blur();
    }
});

// Clear Search When Popup Model Close Button is Clicked
document.querySelectorAll(".close-btn").forEach(button => {
    button.addEventListener("click", () => {
        searchBox.value ="";
        sections.forEach(section => {
            section.querySelectorAll(".card").forEach(card => {
                card.style.display = "";
            });
        });
        // noCardMessage.style.display = "none";
        popup.style.display = "none";
    });
});
// Card Search End