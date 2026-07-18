const cards = document.querySelectorAll(".date");

cards.forEach(card => {

    const dates = card.dataset.dates
        .split(",")
        .map(date => new Date(date.trim()).getTime());

    let currentIndex = 0;

    function updateCountdown() {

        const now = Date.now();

        while (currentIndex < dates.length && now >= dates[currentIndex]) {
            currentIndex++;
        }

        if (currentIndex >= dates.length) {
            card.innerHTML = `
                <div class="finished">
                    <p>Date Upcoming...</p>
                </div>`;
            return false;
        }

        const gap = dates[currentIndex] - now;

        const day = Math.floor(gap / (1000 * 60 * 60 * 24));
        const hour = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minute = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        const second = Math.floor((gap % (1000 * 60)) / 1000);

        card.querySelector(".day").textContent = String(day).padStart(2,"0");
        card.querySelector(".hour").textContent = String(hour).padStart(2,"0");
        card.querySelector(".minute").textContent = String(minute).padStart(2,"0");
        card.querySelector(".second").textContent = String(second).padStart(2,"0");

        const targetDate = new Date(dates[currentIndex]);

        card.querySelector(".target-date").textContent =
            targetDate.toLocaleDateString("en-GB",{
                day:"2-digit",
                month:"short",
                year:"numeric"
            });

        return true;
    }

    updateCountdown();

    const timer = setInterval(() => {
        if (!updateCountdown()) {
            clearInterval(timer);
        }
    }, 1000);

});