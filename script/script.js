const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (event) => {
    if (navMenu.classList.contains('active')) {
        if (!navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

if (document.getElementById('current-year')) {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    
    questionButton.addEventListener('click', () => {
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        item.classList.toggle('active');
    });
});

const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const loadMoreBtn = document.getElementById("load-more-btn");
    
    const hiddenItems = Array.from(document.querySelectorAll(".gallery-item.hidden-item"));

    if (hiddenItems.length === 0) {
        loadMoreBtn.style.display = "none";
        return;
    }

    loadMoreBtn.addEventListener("click", () => {
        const itemsToShow = 6;
        
        const nextBatch = hiddenItems.splice(0, itemsToShow);

        nextBatch.forEach(item => {
            item.style.display = "block";
            
            setTimeout(() => {
                item.style.opacity = "1";
            }, 50);
            
            item.classList.remove("hidden-item");
        });

        if (hiddenItems.length === 0) {
            loadMoreBtn.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightboxImg.src = this.src;
            
            const parent = this.parentElement;
            const overlaySpan = parent.querySelector('.gallery-overlay span');
            if (overlaySpan) {
                lightboxCaption.innerHTML = overlaySpan.innerHTML;
            } else {
                lightboxCaption.innerHTML = this.alt;
            }
            
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let activeImages = [];
    let currentIndex = 0; 

    function updateLightbox(index) {
        if (index < 0 || index >= activeImages.length) return;
        
        currentIndex = index;
        const currentImg = activeImages[currentIndex];
        
        lightboxImg.src = currentImg.src;
                const parent = currentImg.parentElement;
        const overlaySpan = parent.querySelector('.gallery-overlay span');
        if (overlaySpan) {
            lightboxCaption.innerHTML = overlaySpan.innerHTML;
        } else {
            lightboxCaption.innerHTML = currentImg.alt;
        }
    }

    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        galleryGrid.addEventListener('click', function(e) {
            const clickedItem = e.target.closest('.gallery-item');
            if (!clickedItem) return;

            const img = clickedItem.querySelector('.lightbox-trigger');
            if (!img) return;

            activeImages = Array.from(document.querySelectorAll('.gallery-item:not(.hidden-item) .lightbox-trigger'));
            
            const imgIndex = activeImages.indexOf(img);
            
            if (imgIndex !== -1) {
                lightbox.style.display = 'block';
                document.body.style.overflow = 'hidden';
                updateLightbox(imgIndex);
            }
        });
    }

    function showNext() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= activeImages.length) {
            nextIndex = 0;
        }
        updateLightbox(nextIndex);
    }

    function showPrev() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = activeImages.length - 1; 
        }
        updateLightbox(prevIndex);
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (nextBtn) nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });

    if (prevBtn) prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target !== lightboxImg && e.target !== nextBtn && e.target !== prevBtn) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.style.display === 'block') {
            if (e.key === 'ArrowRight') {
                showNext();
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
});