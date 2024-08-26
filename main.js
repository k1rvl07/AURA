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