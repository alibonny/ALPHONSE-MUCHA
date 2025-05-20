document.addEventListener("DOMContentLoaded", () => {
    function getMaxClicks(carousel) {
        // Estrapolazione del valore di base dei click a disposizione per ogni carosello
        let baseMaxClicks = parseInt(carousel.getAttribute("data-max-clicks") || 5);
        const screenWidth = window.innerWidth;
        const isSpecialCarousel = carousel.classList.contains('special-carousel');
        
        // Ricerca del track corretto (.carousel-track o .carousel-track2)
        const track = carousel.querySelector(".carousel-track") || carousel.querySelector(".carousel-track2");
        if (!track || !track.children.length) return baseMaxClicks;
        
        const trackWidth = track.scrollWidth;
        const containerWidth = track.clientWidth;
        
        // Numero di elementi visibili contemporaneamente
        const firstItemWidth = track.children[0].offsetWidth + 16; // +16 per il margine
        const visibleItems = containerWidth / firstItemWidth;
        
        // Numero totale di item nel carosello
        const totalItems = track.children.length;
        
        // Calcolo dei clicks necessari: totale elementi - elementi visibili
        let requiredClicks = Math.ceil(totalItems - visibleItems);
        
        requiredClicks = Math.max(0, requiredClicks);
        
        // Forzatura del calcolo dinamico per caroselli con data-max-clicks="0"
        if (baseMaxClicks === 0 && screenWidth < 1024) {
            return requiredClicks; //  utilizzo del calcolo dinamico ignorando il valore di base dei clicks
        }
        
        if (screenWidth < 768) {
            // SCHERMI PICCOLI: massimizzazione dei clicks 
            return Math.max(baseMaxClicks, requiredClicks);
        } else if (screenWidth < 1024) {
            // SCHERMI MEDI: aumento dei clicks 
            return Math.max(baseMaxClicks, Math.ceil(requiredClicks * 0.8));
        }

        // SCHERMI GRANDI: impostazione di base / calcolo dinamico
        return Math.max(baseMaxClicks, requiredClicks);
    }

    function setupCarousel(carousel) {
        const carouselTrack = carousel.querySelector(".carousel-track") || carousel.querySelector(".carousel-track2");
        if (!carouselTrack) return;
        
        const carouselItems = Array.from(carouselTrack.children);
        const prevButton = carousel.querySelector(".carousel-button.prev");
        const nextButton = carousel.querySelector(".carousel-button.next");

        if (carouselItems.length === 0 || !prevButton || !nextButton) return;
        
        // Debug 
        console.log(`Carosello "${carousel.querySelector("h2")?.textContent || 'No title'}": 
                    Items: ${carouselItems.length}, 
                    data-max-clicks: ${carousel.getAttribute("data-max-clicks")}, 
                    isSpecial: ${carousel.classList.contains('special-carousel')}`);
        

        let currentIndex = 0;
        const totalItems = carouselItems.length;
        let maxClicks = getMaxClicks(carousel);
        let clickCount = 0;

        function getItemWidth(index) {
            return carouselItems[index] ? carouselItems[index].getBoundingClientRect().width + 16 : 0;
        }

        function updateCarousel(animated = true) {
            let offset = 0;
            for (let i = 0; i < currentIndex; i++) {
                offset += getItemWidth(i);
            }
            carouselTrack.style.transition = animated ? "transform 0.5s ease-in-out" : "none";
            carouselTrack.style.transform = `translateX(-${offset}px)`;
            
            // Aggiornamento dello stato dei pulsanti, stato più opaco quando non è più possibile cliccare
            prevButton.style.opacity = currentIndex > 0 ? "1" : "0.5";
            nextButton.style.opacity = clickCount < maxClicks ? "1" : "0.5";
        }

        nextButton.addEventListener("click", () => {
            if (clickCount < maxClicks) {
                if (currentIndex < totalItems - 1) {
                    currentIndex++;
                }
                clickCount++;
            } else {
                currentIndex = 0;
                clickCount = 0;
            }
            updateCarousel();
        });

        prevButton.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                clickCount--;
            }
            updateCarousel();
        });

        function adjustCarousel() {
            maxClicks = getMaxClicks(carousel);
            // Mantenimento della posizione corrente verificando la sua validità
            if (clickCount > maxClicks) {
                currentIndex = 0;
                clickCount = 0;
            }
            // Aggiornamento del carosello senza animazione dopo il ridimensionamento
            setTimeout(() => updateCarousel(false), 100);
        }

        window.addEventListener("resize", adjustCarousel);

        adjustCarousel();
    }

    document.querySelectorAll(".carousel").forEach(setupCarousel);

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.classList && node.classList.contains("carousel")) {
                    setupCarousel(node);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});