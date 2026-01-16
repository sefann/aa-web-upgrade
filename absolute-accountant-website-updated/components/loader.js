// Component Loader - Loads shared header and footer across all pages
(function() {
    // Add cache busting parameter
    const cacheBuster = '?v=' + Date.now();
    
    // Load header
    fetch('/components/header.html' + cacheBuster)
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setActiveNavLink();
            
            // Initialize mobile menu after header is loaded
            if (typeof initializeMobileMenu === 'function') {
                initializeMobileMenu();
            }
        })
        .catch(error => console.error('Error loading header:', error));

    // Load footer
    fetch('/components/footer.html' + cacheBuster)
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            // Update copyright year
            const yearSpan = document.getElementById('currentYear');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        })
        .catch(error => console.error('Error loading footer:', error));

    // Set active nav link based on current page
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('header nav a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // Check if current page matches link
            if (currentPath === href || 
                (currentPath === '/' && href === '/') ||
                (currentPath.includes(href) && href !== '/')) {
                link.classList.add('active');
            }
        });
    }
})();

