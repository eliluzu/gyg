document.addEventListener('DOMContentLoaded', (event) => {

    /* ------------------------------------------------------------- */
    /* --- 1. LÓGICA DE CONTROL DE VIDEO Y AUDIO (HERO SECTION) --- */
    /* ------------------------------------------------------------- */
    const video = document.getElementById("myVideo");
    const btn = document.getElementById("playPauseBtn");
    let isMuted = true;

    if (btn && video) {
        video.muted = true; // Necesario para autoplay
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                btn.innerHTML = "Pausar Video";
            }).catch(error => {
                btn.innerHTML = "Reproducir Video";
                video.pause();
            });
        }

        btn.onclick = function () {
            if (video.paused) {
                video.play();
                btn.innerHTML = "Pausar Video";
            } else {
                video.pause();
                btn.innerHTML = "Reproducir Video";
            }

            // Desmutea solo la primera vez que interactúa
            if (isMuted) {
                video.muted = false;
                isMuted = false;
            }
        };
    }

    /* ---------------------------------------------------------- */
    /* --- 2. LÓGICA DE CONTROL DEL CARRUSEL (TEAM SECTION) --- */
    /* ---------------------------------------------------------- */
    const wrapper = document.querySelector('.card-wrapper');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    if (wrapper && leftArrow && rightArrow) {
        const scrollCarousel = (direction) => {
            const firstCard = wrapper.querySelector('.card');
            if (!firstCard) return;

            const cardWidth = firstCard.offsetWidth;
            const style = window.getComputedStyle(firstCard);
            const cardMargin = parseFloat(style.marginRight) + parseFloat(style.marginLeft);
            const scrollAmount = cardWidth + cardMargin;

            const offset = direction === 'right' ? scrollAmount : -scrollAmount;

            wrapper.scrollBy({
                left: offset,
                behavior: 'smooth'
            });
        };

        leftArrow.addEventListener('click', () => scrollCarousel('left'));
        rightArrow.addEventListener('click', () => scrollCarousel('right'));
    }

    /* ---------------------------------------------------------- */
    /* --- 3. LÓGICA DEL MENÚ HAMBURGUESA (RESPONSIVE) --- */
    /* ---------------------------------------------------------- */
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (menuToggle && mainNav) {
        // Al hacer clic en las 3 rayitas
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic se propague
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en cualquier enlace (anclas)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });

        // Cerrar menú si se hace clic fuera de él
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    }

});

/* ---------------------------------------------------------- */
/* --- 4. BOTÓN "GO TOP" (FUERA DEL DOMCONTENTLOADED) --- */
/* ---------------------------------------------------------- */
window.onscroll = function () {
    const goTopBtn = document.querySelector('.go-top-container');
    if (goTopBtn) {
        if (document.documentElement.scrollTop > 100) {
            goTopBtn.classList.add('show');
        } else {
            goTopBtn.classList.remove('show');
        }
    }
};

const goTopElement = document.querySelector('.go-top-container');
if (goTopElement) {
    goTopElement.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ---------------------------------------------------------- */
/* --- 5. INICIALIZACIÓN DE SWIPER (TESTIMONIALS) --- */
/* ---------------------------------------------------------- */
// Asegúrate de que la librería Swiper.js esté cargada en tu HTML
if (document.querySelector('.js-testimonials-slider')) {
    const swiper = new Swiper('.js-testimonials-slider', {
        grabCursor: true,
        spaceBetween: 30,
        pagination: {
            el: '.js-testimonials-pagination',
            clickable: true
        },
        breakpoints: {
            // Cuando la pantalla es >= 767px
            767: {
                slidesPerView: 2
            },
            // Cuando la pantalla es < 767px
            0: {
                slidesPerView: 1
            }
        }
    });
}