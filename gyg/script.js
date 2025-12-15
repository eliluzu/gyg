document.addEventListener('DOMContentLoaded', (event) => {

    /* ------------------------------------------------------------- */
    /* --- 1. LÓGICA DE CONTROL DE VIDEO Y AUDIO (HERO SECTION) --- */
    /* ------------------------------------------------------------- */

    const video = document.getElementById("myVideo");
    const btn = document.getElementById("playPauseBtn");
    // Bandera para gestionar el desmuteo en el primer clic.
    let isMuted = true;

    if (btn && video) {
        // Asegurar que el video esté muteado al inicio (necesario para autoplay en la mayoría de navegadores).
        video.muted = true;

        // Intentar iniciar la reproducción inmediatamente.
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay exitoso.
                btn.innerHTML = "Pausar Video";
            }).catch(error => {
                // Autoplay bloqueado.
                btn.innerHTML = "Reproducir Video";
                video.pause();
            });
        }

        // Manejador de clic del botón
        btn.onclick = function () {
            if (video.paused) {
                video.play();
                btn.innerHTML = "Pausar Video";
            } else {
                video.pause();
                btn.innerHTML = "Reproducir Video";
            }

            // Desmutear solo en el primer clic del usuario
            if (isMuted) {
                video.muted = false;
                isMuted = false;
            }
        };
    }


    /* ---------------------------------------------------------- */
    /* --- 2. LÓGICA DE CONTROL DEL CARRUSEL (TEAM SECTION) --- */
    /* ---------------------------------------------------------- */

    // Usaremos la lógica simple de scrollBy ya que es la que se adapta a tu CSS.

    const wrapper = document.querySelector('.card-wrapper');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    // Función para desplazar el carrusel
    const scrollCarousel = (direction) => {
        const firstCard = wrapper.querySelector('.card');
        if (!firstCard) return;

        // Ancho de la tarjeta (300px) + margen total (20px, si es 10px a cada lado)
        // Usamos getComputedStyle para obtener el margen real aplicado por el CSS.
        const cardWidth = firstCard.offsetWidth;
        const style = window.getComputedStyle(firstCard);
        // Nota: Si el margen es solo a la derecha, solo se usa parseFloat(style.marginRight).
        // Asumiendo que hay 10px de margen a la izquierda y 10px a la derecha para un total de 20px entre tarjetas.
        const cardMargin = parseFloat(style.marginRight) + parseFloat(style.marginLeft);
        const scrollAmount = cardWidth + cardMargin;

        const offset = direction === 'right' ? scrollAmount : -scrollAmount;

        wrapper.scrollBy({
            left: offset,
            behavior: 'smooth'
        });
    };

    // Event Listeners para las flechas
    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            scrollCarousel('left');
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            scrollCarousel('right');
        });
    }
});

window.onscroll = function () {
    const container = document.querySelector('.go-top-container');
    if (document.documentElement.scrollTop > 100) {
        container.classList.add('show');
    } else {
        container.classList.remove('show');
    }
}

document.querySelector('.go-top-container')
    .addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
const swiper = new Swiper('.js-testimonials-slider', {
    grabCursor: true,
    spaceBetween: 30,
    pagination: {
        el: '.js-testimonials-pagination', // <-- Aquí le dices dónde poner los puntitos
        clickable: true // <-- Esto hace que puedas hacer clic en los puntitos
    },
    breakpoints: {
        767: {
            slidesPerView: 2
        }
    }
});


