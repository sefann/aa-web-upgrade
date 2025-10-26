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
    if (header && window.scrollY > 50) {
        header.classList.add('sticky');
    } 
    else if (header) {
        header.classList.remove('sticky');
    }
});

// Mobile Menu Toggle - More robust initialization
let mobileMenuInitialized = false;

function initializeMobileMenu() {
    // Prevent multiple initializations
    if (mobileMenuInitialized) return;
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    const menuIcon = document.querySelector('.mobile-menu-btn i');
    
    console.log('Attempting to initialize mobile menu...');
    console.log('Mobile menu button found:', !!mobileMenuBtn);
    console.log('Menu found:', !!menu);
    console.log('Menu icon found:', !!menuIcon);
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('menu-overlay');
        document.body.appendChild(overlay);
        console.log('Created menu overlay');
    }

    if (mobileMenuBtn && menu && menuIcon) {
        // Function to close menu
        const closeMenu = () => {
            menu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            overlay.classList.remove('active');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-times');
            document.body.style.overflow = 'auto';
            console.log('Menu closed');
        };

        // Function to open menu
        const openMenu = () => {
            menu.classList.add('active');
            mobileMenuBtn.classList.add('active');
            overlay.classList.add('active');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
            console.log('Menu opened');
        };

        // Toggle menu function
        const toggleMenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu button clicked');
            
            if (menu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        };
        
        // Remove any existing event listeners by cloning the button
        const newMobileMenuBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(newMobileMenuBtn, mobileMenuBtn);
        
        // Get the new menu icon
        const newMenuIcon = newMobileMenuBtn.querySelector('i');
        
        // Add click event listener to the new button
        newMobileMenuBtn.addEventListener('click', toggleMenu);
        
        // Also add touch event for mobile devices
        newMobileMenuBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            toggleMenu(e);
        });

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
        
        mobileMenuInitialized = true;
        console.log('Mobile menu initialized successfully');
    } else {
        console.log('Mobile menu elements not found, retrying in 100ms...');
        // Retry after a short delay
        setTimeout(initializeMobileMenu, 100);
    }
}

// Multiple initialization attempts to ensure it works
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile menu...');
    // Try immediately
    initializeMobileMenu();
    // Try after a short delay
    setTimeout(initializeMobileMenu, 100);
    // Try after header is loaded
    setTimeout(initializeMobileMenu, 500);
    // Try after a longer delay as fallback
    setTimeout(initializeMobileMenu, 1000);
});

// Also try when window loads
window.addEventListener('load', function() {
    console.log('Window loaded, trying mobile menu initialization...');
    initializeMobileMenu();
});

// Fallback: Direct event delegation approach
document.addEventListener('click', function(e) {
    // Check if the clicked element is the mobile menu button
    if (e.target.closest('.mobile-menu-btn')) {
        e.preventDefault();
        e.stopPropagation();
        
        const menu = document.querySelector('.menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const menuIcon = document.querySelector('.mobile-menu-btn i');
        let overlay = document.querySelector('.menu-overlay');
        
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.classList.add('menu-overlay');
            document.body.appendChild(overlay);
        }
        
        if (menu && mobileMenuBtn && menuIcon) {
            if (menu.classList.contains('active')) {
                // Close menu
                menu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                overlay.classList.remove('active');
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-times');
                document.body.style.overflow = 'auto';
                console.log('Menu closed via fallback');
            } else {
                // Open menu
                menu.classList.add('active');
                mobileMenuBtn.classList.add('active');
                overlay.classList.add('active');
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
                console.log('Menu opened via fallback');
            }
        }
    }
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

// Only initialize carousel if it exists
if (carousel) {
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
}

const createDots = () => {
    const dotsContainer = document.querySelector('.carousel-dots');
    const items = document.querySelectorAll('.carousel-item');
    
    if (dotsContainer && items.length > 0) {
        const uniqueItems = items.length / 2;
        
        for (let i = 0; i < uniqueItems; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }
    }
};

const updateDots = () => {
    if (!carousel) return;
    
    const dots = document.querySelectorAll('.dot');
    const carouselItem = carousel.querySelector('.carousel-item');
    
    if (dots.length > 0 && carouselItem) {
        const itemWidth = carouselItem.offsetWidth;
        const activeIndex = Math.round(carousel.scrollLeft / itemWidth) % dots.length;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }
};

// Testimonials Carousel
const testimonialCarousel = document.querySelector('.testimonials-carousel');
const testimonials = document.querySelectorAll('.testimonial-item');
const avatars = document.querySelectorAll('.testimonial-avatars img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

function showTestimonial(index) {
    if (testimonials.length === 0 || avatars.length === 0) return;
    
    testimonials.forEach(item => item.classList.remove('active'));
    avatars.forEach(avatar => avatar.classList.remove('active'));
    
    if (testimonials[index]) testimonials[index].classList.add('active');
    if (avatars[index]) avatars[index].classList.add('active');
}

function nextTestimonial() {
    if (testimonials.length === 0) return;
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
}

function prevTestimonial() {
    if (testimonials.length === 0) return;
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
}

// Only add event listeners if elements exist
if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);

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

if (testimonialCarousel) {
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
}

// Initialize first testimonial
showTestimonial(0);

// Only add carousel event listeners if carousel exists
if (carousel) {
    carousel.addEventListener('scroll', updateDots);
    createDots();
}

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