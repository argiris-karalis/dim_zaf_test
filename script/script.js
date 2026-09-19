const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Ανοιγοκλείσιμο μενού με κλικ στο hamburger
hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Αυτόματο κλείσιμο μενού όταν πατηθεί κάποιο link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ΠΡΟΣΘΗΚΗ: Κλείσιμο μενού όταν πατηθεί εκτός του μενού ή του hamburger-btn
document.addEventListener('click', (event) => {
    // Ελέγχουμε αν το μενού είναι όντως ανοιχτό
    if (navMenu.classList.contains('active')) {
        // Αν το κλικ ΔΕΝ έγινε μέσα στο μενού ΚΑΙ ΔΕΝ έγινε πάνω στο κουμπί hamburger
        if (!navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Ενημέρωση έτους στο footer
if (document.getElementById('current-year')) {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// FAQ Accordion Λειτουργικότητα
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    
    questionButton.addEventListener('click', () => {
        // Αν θέλεις να κλείνουν τα άλλα παράθυρα όταν ανοίγει ένα καινούριο:
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Ανοιγοκλείνει το τρέχον FAQ item
        item.classList.toggle('active');
    });
});

// Λειτουργικότητα για το Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // Αν ο χρήστης έχει σκρολάρει πάνω από 300px από την κορυφή
    if (window.pageYOffset > 300) {
        // Εμφάνισε το κουμπί προσθέτοντας την κλάση 'show'
        backToTopButton.classList.add('show');
    } else {
        // Κρύψε το κουμπί αφαιρώντας την κλάση 'show'
        backToTopButton.classList.remove('show');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const loadMoreBtn = document.getElementById("load-more-btn");
    
    // Επιλέγουμε όλα τα αρχικά κρυμμένα στοιχεία της γκαλερί
    const hiddenItems = Array.from(document.querySelectorAll(".gallery-item.hidden-item"));

    // Αν δεν υπάρχουν επιπλέον φωτογραφίες, κρύψε το κουμπί εξαρχής
    if (hiddenItems.length === 0) {
        loadMoreBtn.style.display = "none";
        return;
    }

    loadMoreBtn.addEventListener("click", () => {
        // Ορίζουμε πόσες φωτογραφίες θα εμφανίζονται σε κάθε "κλικ" (π.χ. 6)
        const itemsToShow = 6;
        
        // Παίρνουμε τις επόμενες φωτογραφίες από τη λίστα
        const nextBatch = hiddenItems.splice(0, itemsToShow);

        nextBatch.forEach(item => {
            item.style.display = "block"; // Εμφάνιση στο grid
            
            // Μικρό timeout για να προλάβει ο browser να εφαρμόσει το display: block 
            // και να δουλέψει ομαλά το fade-in animation
            setTimeout(() => {
                item.style.opacity = "1";
            }, 50);
            
            // Αφαιρούμε την κλάση hidden-item για να μην ξαναεπιλεγεί
            item.classList.remove("hidden-item");
        });

        // Αν εμφανίστηκαν όλες οι φωτογραφίες, εξαφάνισε το κουμπί
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
            
            // Έξυπνη εύρεση του κειμένου από το overlay
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

    let activeImages = []; // Εδώ θα αποθηκεύουμε τις φωτογραφίες που είναι ορατές εκείνη τη στιγμή
    let currentIndex = 0;  // Η τρέχουσα θέση της ανοιχτής φωτογραφίας

    // Συνάρτηση που ενημερώνει το Lightbox με τα στοιχεία της φωτογραφίας στη θέση "index"
    function updateLightbox(index) {
        if (index < 0 || index >= activeImages.length) return;
        
        currentIndex = index;
        const currentImg = activeImages[currentIndex];
        
        lightboxImg.src = currentImg.src;
        
        // Βρίσκουμε το κείμενο από το overlay της συγκεκριμένης φωτογραφίας
        const parent = currentImg.parentElement;
        const overlaySpan = parent.querySelector('.gallery-overlay span');
        if (overlaySpan) {
            lightboxCaption.innerHTML = overlaySpan.innerHTML;
        } else {
            lightboxCaption.innerHTML = currentImg.alt;
        }
    }

    // Event delegation: Ανιχνεύει κλικ σε όλο το gallery grid
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        galleryGrid.addEventListener('click', function(e) {
            // Ψάχνουμε αν το κλικ έγινε πάνω στην εικόνα ή μέσα στο gallery-item
            const clickedItem = e.target.closest('.gallery-item');
            if (!clickedItem) return;

            const img = clickedItem.querySelector('.lightbox-trigger');
            if (!img) return;

            // 1. Δημιουργούμε τη λίστα ΜΟΝΟ με τις ορατές φωτογραφίες εκείνη τη στιγμή
            activeImages = Array.from(document.querySelectorAll('.gallery-item:not(.hidden-item) .lightbox-trigger'));
            
            // 2. Βρίσκουμε τη θέση της φωτογραφίας που πατήθηκε
            const imgIndex = activeImages.indexOf(img);
            
            if (imgIndex !== -1) {
                lightbox.style.display = 'block';
                document.body.style.overflow = 'hidden';
                updateLightbox(imgIndex);
            }
        });
    }

    // Λειτουργίες πλοήγησης
    function showNext() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= activeImages.length) {
            nextIndex = 0; // Κάνει κύκλο στην αρχή αν φτάσει στο τέλος
        }
        updateLightbox(nextIndex);
    }

    function showPrev() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = activeImages.length - 1; // Πάει στο τέλος αν είμαστε στην πρώτη
        }
        updateLightbox(prevIndex);
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event Listeners για τα κουμπιά πλοήγησης
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Εμποδίζει το κλείσιμο του lightbox από το κλικ στο φόντο
        showNext();
    });

    if (prevBtn) prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    // Κλείσιμο με κλικ στο μαύρο background (εκτός της φωτογραφίας και των βελών)
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target !== lightboxImg && e.target !== nextBtn && e.target !== prevBtn) {
                closeLightbox();
            }
        });
    }

    // Υποστήριξη Πληκτρολογίου (Αριστερό/Δεξί βέλος και ESC)
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