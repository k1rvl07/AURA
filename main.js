$(document).ready(function () {
    // Функция для сброса и анимации элемента .main__hero
    let previousWidth = $(window).width();

    function resetAndAnimate() {
        $(".main__hero").stop(true, true).css({
            bottom: '',
            right: '',
            opacity: 0
        });

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
            }, 1200);
        }
    }

    function checkBreakpointsMain() {
        const currentWidth = $(window).width();

        if ((previousWidth < 1024 && currentWidth >= 1024) ||
            (previousWidth >= 1024 && previousWidth < 1920 && (currentWidth < 1024 || currentWidth >= 1920)) ||
            (previousWidth >= 1920 && currentWidth < 1920)) {
            resetAndAnimate();
        }

        previousWidth = currentWidth;
    }

    // Инициализация анимации
    resetAndAnimate();

    // Обработчик изменения размера окна
    $(window).resize(function () {
        checkBreakpointsMain()
    });

    // Анимация точки .auction__live-dot
    setInterval(function () {
        $(".auction__live-dot").fadeTo(700, 0.3).fadeTo(700, 1);
    }, 1000);

    // Функция для обновления таймера
    function updateTimer(hoursId, minutesId, secondsId, endTime) {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            $(`#${hoursId}`).text('00');
            $(`#${minutesId}`).text('00');
            $(`#${secondsId}`).text('00');
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $(`#${hoursId}`).text(String(hours).padStart(2, '0'));
        $(`#${minutesId}`).text(String(minutes).padStart(2, '0'));
        $(`#${secondsId}`).text(String(seconds).padStart(2, '0'));
    }

    // Функция для создания времени окончания таймера
    function createEndTime(hours, minutes, seconds) {
        return new Date().getTime() + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
    }

    // Массив таймеров
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

    // Интервал для обновления таймеров
    const timerInterval = setInterval(() => {
        timers.forEach(timer => {
            updateTimer(timer.hoursId, timer.minutesId, timer.secondsId, timer.endTime);
        });
    }, 1000);

    // Слайдер для .other-auction
    const slides = $('.other-auction .slider__slide');
    const navItems = $('.other-auction .slider__nav-item');
    const slider = $('#othAucSlides');

    let currentIndex = 0;

    function updateNavIndicators(index) {
        navItems.each(function (i) {
            if (i === index) {
                $(this).css('background', '#46f4db');
            } else {
                $(this).css('background', '#ededf2');
            }
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = $(slides).index(entry.target);
                currentIndex = index;
                updateNavIndicators(currentIndex);
            }
        });
    }, {
        threshold: 0.5
    });

    slides.each(function () {
        observer.observe(this);
    });

    navItems.each(function (index) {
        $(this).on('click', function () {
            const slideWidth = $(slides[0]).width();
            slider.animate({
                scrollLeft: slideWidth * index
            }, 500);
        });
    });

    updateNavIndicators(currentIndex);

    // Слайдер для .new-stickers
    const newSlides = $('.new-stickers .slider__slide');
    const newNavItems = $('.new-stickers .slider__nav-button');
    const newSlider = $('#newStickersSlides');
    let newCurrentIndex = 0;

    function updateNewNavIndicators(index) {
        newNavItems.each(function (i) {
            if (i === index) {
                $(this).css('background', '#d13130');
            } else {
                $(this).css('background', 'transparent');
            }
        });
    }

    function scrollToSlide(index) {
        newCurrentIndex = index;
        updateNewNavIndicators(newCurrentIndex);
        newSlides.eq(index).get(0).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    const newObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = $(newSlides).index(entry.target);
                newCurrentIndex = index;
                updateNewNavIndicators(newCurrentIndex);
            }
        });
    }, {
        threshold: 0.5
    });

    newSlides.each(function () {
        newObserver.observe(this);
    });

    newNavItems.each(function (i) {
        $(this).on('click', function () {
            scrollToSlide(i);
        });
    });

    updateNewNavIndicators(newCurrentIndex);

    // Обработчики для .form__checkbox-button
    $('.form__checkbox-button').on('mouseover', function () {
        if (!$(this).hasClass('checked')) {
            $(this).find('.form__checkbox-img').css('opacity', 1);
        }
    });

    $('.form__checkbox-button').on('mouseout', function () {
        if (!$(this).hasClass('checked')) {
            $(this).find('.form__checkbox-img').css('opacity', 0);
        }
    });

    $('.form__checkbox-button').on('click', function () {
        $(this).toggleClass('checked');
        if ($(this).hasClass('checked')) {
            $(this).find('.form__checkbox-img').css('opacity', 1);
        } else {
            $(this).find('.form__checkbox-img').css('opacity', 0);
        }
    });

    // Анимация для .subscribe__img при ширине окна < 1024
    let animationStarted = false;

    const observerSubscribe = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationStarted) {
                $('.subscribe__img:nth-child(1)').animate({
                    top: 0,
                    transform: 'scale(0.5)'
                }, 700, () => {
                    animationStarted = true;
                });
                observerSubscribe.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.8
    });

    const target = document.querySelector('.subscribe__img-container');
    observerSubscribe.observe(target);
    // Функции для сброса позиций и анимации .subscribe__img
    let prevWindowWidth = $(window).width();

    function resetPositions() {
        const windowWidth = $(window).width();

        if (windowWidth >= 1024 && windowWidth < 1920) {
            $('.subscribe__img:nth-child(2)').css('top', '396px');
            $('.subscribe__img:nth-child(3)').css('top', '-220px');
            $('.subscribe__img:nth-child(4)').css('top', '396px');
            $('.subscribe__img:nth-child(5)').css('top', '-172px');
        } else if (windowWidth >= 1920) {
            $('.subscribe__img:nth-child(2)').css('top', '398px');
            $('.subscribe__img:nth-child(3)').css('top', '-362px');
            $('.subscribe__img:nth-child(4)').css('top', '394px');
            $('.subscribe__img:nth-child(5)').css('top', '-294px');
        }
    }

    function handleIntersectionSubscribe() {
        const windowWidth = $(window).width();

        if (windowWidth >= 1024 && windowWidth < 1920) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        $('.subscribe__img:nth-child(2)').stop().animate({
                            top: '171px'
                        }, 900);
                        $('.subscribe__img:nth-child(3)').stop().animate({
                            top: '50px'
                        }, 650);
                        $('.subscribe__img:nth-child(4)').stop().animate({
                            top: '158px'
                        }, 750);
                        $('.subscribe__img:nth-child(5)').stop().animate({
                            top: '114px'
                        }, 850);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.8
            });

            const target = document.querySelector('.subscribe__img-container');
            observer.observe(target);
        } else if (windowWidth >= 1920) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        $('.subscribe__img:nth-child(2)').stop().animate({
                            top: '139px'
                        }, 900);
                        $('.subscribe__img:nth-child(3)').stop().animate({
                            top: '-66px'
                        }, 650);
                        $('.subscribe__img:nth-child(4)').stop().animate({
                            top: '114px'
                        }, 750);
                        $('.subscribe__img:nth-child(5)').stop().animate({
                            top: '44px'
                        }, 850);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.8
            });

            const target = document.querySelector('.subscribe__img-container');
            observer.observe(target);
        }
    }

    function checkBreakpointsSubscribe() {
        const windowWidth = $(window).width();

        if ((prevWindowWidth < 1024 && windowWidth >= 1024) ||
            (prevWindowWidth >= 1024 && prevWindowWidth < 1920 && windowWidth >= 1920) ||
            (prevWindowWidth >= 1920 && windowWidth < 1920)) {
            $('.subscribe__img').stop(true, true); // Останавливаем все анимации и сбрасываем позиции
            resetPositions();
            handleIntersectionSubscribe();
        }

        prevWindowWidth = windowWidth;
    }

    resetPositions();
    handleIntersectionSubscribe();

    $(window).resize(function () {
        checkBreakpointsSubscribe()
    });

    // Создаем наблюдатель с указанным порогом видимости
    function observeImagesAuthor(selector, threshold = 0.8) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const images = $(`.author__img`, entry.target);
                    images.each((index, image) => {
                        $(image).css({
                            transform: 'scale(1)',
                            opacity: 1,
                            transition: 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out',
                            'transition-delay': `${index * 0.4}s`
                        });
                    });
                    // Отключаем наблюдатель, чтобы он не вызывался повторно
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold });

        // Наблюдаем за контейнерами
        $(selector).each(function () {
            observer.observe(this);
        });

        // Добавляем обработчик изменения размера окна
        let lastWidth = $(window).width();
        $(window).on('resize', function () {
            const currentWidth = $(window).width();
            if ((lastWidth < 1024 && currentWidth >= 1024) || (lastWidth >= 1024 && currentWidth < 1024) ||
                (lastWidth < 1920 && currentWidth >= 1920) || (lastWidth >= 1920 && currentWidth < 1920)) {
                resetAnimation(selector);
            }
            lastWidth = currentWidth;
        });

        // Функция для сброса анимации
        function resetAnimation(selector) {
            const containers = $(selector);
            containers.each(function () {
                const images = $(`.author__img`, this);
                images.css({
                    transform: 'scale(0.3)',
                    opacity: 0,
                    transition: 'none'
                });
            });
            // Перезапускаем наблюдатель
            containers.each(function () {
                observer.unobserve(this);
                observer.observe(this);
            });
        }
    }

    observeImagesAuthor('.author__img-container');

    // Функция для сброса анимации .condition__img
    let indexCondition = 0;
    let prevWindowWidthCondition = $(window).width();

    function resetAnimations() {
        indexCondition = 0;
        $('.condition__img').each(function () {
            $(this).stop(true, true).css({
                'opacity': 0,
                'transition': 'opacity 0.0s'
            });
        });
    }

    function handleIntersectionCondition() {
        observerCondition = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observerCondition.unobserve(entry.target);
                    $(entry.target).css('transition', 'opacity 0.3s')
                        .delay(150 * indexCondition).animate({
                            opacity: 1
                        }, 150);
                    indexCondition++;
                }
            });
        }, {
            threshold: 0.5
        });

        $('.condition__img').each(function () {
            observerCondition.observe(this);
        });
    }

    function checkBreakpointsCondition() {
        const windowWidth = $(window).width();

        if ((prevWindowWidthCondition >= 1024 && windowWidth < 1024) || // Добавлено это условие
            (prevWindowWidthCondition < 1024 && windowWidth >= 1024) ||
            (prevWindowWidthCondition >= 1024 && prevWindowWidthCondition < 1920 && windowWidth >= 1920) ||
            (prevWindowWidthCondition >= 1920 && windowWidth < 1920)) {
            resetAnimations();
            setTimeout(function () {
                handleIntersectionCondition();
            });
        }

        prevWindowWidthCondition = windowWidth;
    }

    resetAnimations();
    handleIntersectionCondition();

    $(window).resize(checkBreakpointsCondition);
});