document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const updateYear = () => {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };
    
    // Try to update year immediately and also after a delay (for dynamically loaded footer)
    updateYear();
    setTimeout(updateYear, 100);
    
    // Typewriter effect with rotating words
    const initTypewriter = () => {
        const typewriterElement = document.getElementById('typewriter-text');
        
        if (typewriterElement) {
            const words = ['Accounting', 'Bookkeeping', 'Tax Prep', 'Advisory'];
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            
            function typeWriter() {
                const currentWord = words[wordIndex];
                
                if (isDeleting) {
                    typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                    charIndex++;
                }
                
                let typeSpeed = isDeleting ? 75 : 120;
                
                if (!isDeleting && charIndex === currentWord.length) {
                    typeSpeed = 1500; // Pause at end
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    typeSpeed = 300; // Pause before typing next word
                }
                
                setTimeout(typeWriter, typeSpeed);
            }
            
            // Start typewriter effect
            setTimeout(typeWriter, 300);
        }
    };
    
    // Initialize typewriter immediately and retry if element not found
    initTypewriter();
    if (!document.getElementById('typewriter-text')) {
        setTimeout(initTypewriter, 100);
    }
});
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } 
    else {
        header.classList.remove('sticky');
    }
});

// Mobile Menu Toggle - Initialize after header is loaded
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    const menuIcon = document.querySelector('.mobile-menu-btn i');
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('menu-overlay');
        document.body.appendChild(overlay);
    }

    if (mobileMenuBtn && menu && menuIcon) {
        // Remove any existing event listeners to prevent duplicates
        const newMobileMenuBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(newMobileMenuBtn, mobileMenuBtn);
        
        const newMenuIcon = newMobileMenuBtn.querySelector('i');
        
        newMobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            menu.classList.toggle('active');
            newMobileMenuBtn.classList.toggle('active');
            overlay.classList.toggle('active');
            newMenuIcon.classList.toggle('fa-bars');
            newMenuIcon.classList.toggle('fa-times');
            
            // Prevent body scroll when menu is open
            if (menu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Function to close menu
        const closeMenu = () => {
            menu.classList.remove('active');
            newMobileMenuBtn.classList.remove('active');
            overlay.classList.remove('active');
            newMenuIcon.classList.add('fa-bars');
            newMenuIcon.classList.remove('fa-times');
            document.body.style.overflow = 'auto';
        };

        // Close menu when clicking on menu links
        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking on overlay
        overlay.addEventListener('click', closeMenu);

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !newMobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        console.log('Mobile menu initialized successfully');
    } else {
        console.log('Mobile menu elements not found, retrying...');
        // Retry after a short delay
        setTimeout(initializeMobileMenu, 100);
    }
}

// Initialize mobile menu when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the header to be loaded by loader.js
    setTimeout(initializeMobileMenu, 200);
});

document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.menu ul li a');
    
    navLinks.forEach(link => {
        if (currentPath === link.getAttribute('href')) {
            link.classList.add('active');
        }
    });
});

document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        const cursor = document.querySelector('.cursor-dot');
        cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    });
});

const interactiveElements = document.querySelectorAll('button, a, .read-more');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.querySelector('.cursor-dot').classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
        document.querySelector('.cursor-dot').classList.remove('active');
    });
});

const carousel = document.querySelector('.services-carousel');
let isDragging = false;
let startX;
let scrollLeft;

const handleDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    
    requestAnimationFrame(() => {
        carousel.scrollLeft = scrollLeft - walk;
    });
};

carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    carousel.style.cursor = 'grabbing';
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mousemove', handleDrag);
carousel.addEventListener('mouseup', () => {
    isDragging = false;
    carousel.style.cursor = 'grab';
});
carousel.addEventListener('mouseleave', () => {
    isDragging = false;
    carousel.style.cursor = 'grab';
});

const createDots = () => {
    const dotsContainer = document.querySelector('.carousel-dots');
    const items = document.querySelectorAll('.carousel-item');
    const uniqueItems = items.length / 2;
    
    for (let i = 0; i < uniqueItems; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    }
};

const updateDots = () => {
    const dots = document.querySelectorAll('.dot');
    const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;
    const activeIndex = Math.round(carousel.scrollLeft / itemWidth) % dots.length;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
};

// Testimonials Carousel
const testimonialCarousel = document.querySelector('.testimonials-carousel');
const testimonials = document.querySelectorAll('.testimonial-item');
const avatars = document.querySelectorAll('.testimonial-avatars img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

function showTestimonial(index) {
    testimonials.forEach(item => item.classList.remove('active'));
    avatars.forEach(avatar => avatar.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    avatars[index].classList.add('active');
}

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
}

function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
}

prevBtn.addEventListener('click', prevTestimonial);
nextBtn.addEventListener('click', nextTestimonial);

avatars.forEach((avatar, index) => {
    avatar.addEventListener('click', () => {
        currentIndex = index;
        showTestimonial(currentIndex);
    });
});

// Testimonials Dragging
let testimonialDragging = false;
let testimonialStartX;
let dragThreshold = 30; // Reduce threshold for more responsive dragging

testimonialCarousel.addEventListener('mousedown', (e) => {
    testimonialDragging = true;
    testimonialStartX = e.pageX;
    testimonialCarousel.style.cursor = 'grabbing';
});

testimonialCarousel.addEventListener('mousemove', (e) => {
    if (!testimonialDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - testimonialStartX);
    
    if (Math.abs(walk) > dragThreshold) {
        if (walk > 0) {
            prevTestimonial();
        } else {
            nextTestimonial();
        }
        testimonialDragging = false;
    }
});

testimonialCarousel.addEventListener('mouseup', () => {
    testimonialDragging = false;
    testimonialCarousel.style.cursor = 'grab';
});

testimonialCarousel.addEventListener('mouseleave', () => {
    testimonialDragging = false;
    testimonialCarousel.style.cursor = 'grab';
});

// Initialize first testimonial
showTestimonial(0);

carousel.addEventListener('scroll', updateDots);
createDots();setupCarousel();

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);