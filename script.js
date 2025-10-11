document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
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

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const menu = document.querySelector('.menu');
const menuIcon = document.querySelector('.mobile-menu-btn i');

mobileMenuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-times');
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