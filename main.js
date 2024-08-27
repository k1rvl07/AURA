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

function createEndTime(hours, minutes, seconds) {
    return new Date().getTime() + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
}

const timers = [
    { hoursId: 'hours-1', minutesId: 'minutes-1', secondsId: 'seconds-1', endTime: createEndTime(1, 48, 47) },
    { hoursId: 'hours-2', minutesId: 'minutes-2', secondsId: 'seconds-2', endTime: createEndTime(3, 25, 23) },
    { hoursId: 'hours-3', minutesId: 'minutes-3', secondsId: 'seconds-3', endTime: createEndTime(0, 15, 3) },
    { hoursId: 'hours-4', minutesId: 'minutes-4', secondsId: 'seconds-4', endTime: createEndTime(23, 5, 8) },
    { hoursId: 'hours-5', minutesId: 'minutes-5', secondsId: 'seconds-5', endTime: createEndTime(1, 15, 55) },
    { hoursId: 'hours-6', minutesId: 'minutes-6', secondsId: 'seconds-6', endTime: createEndTime(1, 28, 11) },
    { hoursId: 'hours-7', minutesId: 'minutes-7', secondsId: 'seconds-7', endTime: createEndTime(8, 44, 43) },
    { hoursId: 'hours-8', minutesId: 'minutes-8', secondsId: 'seconds-8', endTime: createEndTime(0, 55, 18) },
    { hoursId: 'hours-9', minutesId: 'minutes-9', secondsId: 'seconds-9', endTime: createEndTime(0, 18, 12) }
];

const timerInterval = setInterval(() => {
    timers.forEach(timer => {
        updateTimer(timer.hoursId, timer.minutesId, timer.secondsId, timer.endTime);
    });
}, 1000);

const slides = document.querySelectorAll('.other-auction .slider__slide');
const navItems = document.querySelectorAll('.other-auction .slider__nav-item');
const slider = document.getElementById('othAucSlides');

let currentIndex = 0;

function updateNavIndicators(index) {
    navItems.forEach((item, i) => {
        if (i === index) {
            item.style.background = '#46f4db';
        } else {
            item.style.background = '#ededf2';
        }
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(slides).indexOf(entry.target);
            currentIndex = index;
            updateNavIndicators(currentIndex);
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the slide is visible
});

slides.forEach(slide => {
    observer.observe(slide);
});

navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const slideWidth = slides[0].offsetWidth;
        slider.scrollTo({
            left: slideWidth * index,
            behavior: 'smooth'
        });
    });
});

// Initial update
updateNavIndicators(currentIndex);

const newSlides = document.querySelectorAll('.new-stickers .slider__slide');
const newNavItems = document.querySelectorAll('.new-stickers .slider__nav-button');
const newSlider = document.getElementById('newStickersSlides');
let newCurrentIndex = 0;

// Function to update navigation indicators
function updateNewNavIndicators(index) {
    newNavItems.forEach((item, i) => {
        if (i === index) {
            item.style.background = '#d13130';
        } else {
            item.style.background = 'transparent';
        }
    });
}

// Function to scroll to the slide
function scrollToSlide(index) {
    newCurrentIndex = index;
    updateNewNavIndicators(newCurrentIndex);
    // Scroll the slider to the desired slide
    newSlides[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

// Set up the IntersectionObserver for new slides
const newObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(newSlides).indexOf(entry.target);
            newCurrentIndex = index;
            updateNewNavIndicators(newCurrentIndex);
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the slide is visible
});

// Observe each new slide
newSlides.forEach(slide => {
    newObserver.observe(slide);
});

// Add event listeners to navigation buttons
newNavItems.forEach((item, i) => {
    item.addEventListener('click', () => {
        scrollToSlide(i);
    });
});

// Initial update for new navigation indicators
updateNewNavIndicators(newCurrentIndex);