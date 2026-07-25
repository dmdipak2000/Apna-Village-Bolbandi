const searchBox = document.getElementById("searchBox");
const cards = document.querySelectorAll(".card");
const noCardMessage = document.getElementById("noCardMessage");

searchBox.addEventListener("input", function () {
    const keyword = this.value.toLowerCase().trim();

    let found = false;
    let firstMatch = null;

    cards.forEach(card => {
        const title = card.querySelector(".card-title").textContent.toLowerCase();

        if (keyword == "" || title.includes(keyword)) {
            card.style.display = "";
            found = true;

        if (!firstMatch) {
            firstMatch = card;
        }
        } else {
            card.style.display = "none";
        }
    });

    if (firstMatch && keyword != "") {
        setTimeout(() => {
                firstMatch.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
        }, 50);
    }
    noCardMessage.style.display = (keyword !== "" && !found) ? "block" : "none";
});