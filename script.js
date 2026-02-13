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
                // Icono de Pausa al iniciar
                btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            }).catch(error => {
                // Icono de Play si el autoplay falla
                btn.innerHTML = '<i class="fa-solid fa-play"></i>';
                video.pause();
            });
        }

        btn.onclick = function () {
            if (video.paused) {
                video.play();
                btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            } else {
                video.pause();
                btn.innerHTML = '<i class="fa-solid fa-play"></i>';
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
    const body = document.body;
    const navLinks = document.querySelectorAll('.main-nav a');

    menuToggle.addEventListener('click', () => {
        // toggle('active') dispara la animación de la X en el CSS
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        body.classList.toggle('menu-open'); // Bloquea el scroll de fondo
    });

    // Cerrar menú automáticamente al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
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