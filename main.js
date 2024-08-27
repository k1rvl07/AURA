$(document).ready(function () {
    if ($(window).width() < 1024) {
        $(".main__hero").animate({
            bottom: "0",
            opacity: "1"
        }, 800);
    } else if ($(window).width() < 1920) {
        $(".main__hero").animate({
            right: "0",
            opacity: "1"
        }, 800);
    } else {
        $(".main__hero").animate({
            right: "0",
            opacity: "1"
        }, 1000);
    }
});

setInterval(function () {
    $(".auction__live-dot").fadeTo(700, 0.3).fadeTo(700, 1);
}, 1000);

function updateTimer(hoursId, minutesId, secondsId, endTime) {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById(hoursId).textContent = '00';
        document.getElementById(minutesId).textContent = '00';
        document.getElementById(secondsId).textContent = '00';
        return;
    }

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById(hoursId).textContent = String(hours).padStart(2, '0');
    document.getElementById(minutesId).textContent = String(minutes).padStart(2, '0');
    document.getElementById(secondsId).textContent = String(seconds).padStart(2, '0');
}

const endTime1 = new Date().getTime() + (1 * 60 * 60 * 1000) + (48 * 60 * 1000) + (47 * 1000);

const timerInterval = setInterval(() => {
    updateTimer('hours-1', 'minutes-1', 'seconds-1', endTime1);
}, 1000);