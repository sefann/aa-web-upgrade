// Mobile Menu Test Script
// Add this to your HTML temporarily to test mobile menu functionality

console.log('Mobile Menu Test Script Loaded');

// Test function to check if elements exist
function testMobileMenuElements() {
    console.log('=== MOBILE MENU ELEMENT TEST ===');
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    const menuIcon = document.querySelector('.mobile-menu-btn i');
    
    console.log('Mobile menu button:', mobileMenuBtn);
    console.log('Menu:', menu);
    console.log('Menu icon:', menuIcon);
    
    if (mobileMenuBtn) {
        console.log('Button styles:', window.getComputedStyle(mobileMenuBtn).display);
        console.log('Button is visible:', mobileMenuBtn.offsetWidth > 0 && mobileMenuBtn.offsetHeight > 0);
    }
    
    if (menu) {
        console.log('Menu styles:', window.getComputedStyle(menu).display);
    }
    
    return { mobileMenuBtn, menu, menuIcon };
}

// Test function to manually toggle menu
function testToggleMenu() {
    console.log('=== MANUAL MENU TOGGLE TEST ===');
    
    const { mobileMenuBtn, menu, menuIcon } = testMobileMenuElements();
    
    if (menu && mobileMenuBtn && menuIcon) {
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-times');
            console.log('Menu closed manually');
        } else {
            menu.classList.add('active');
            mobileMenuBtn.classList.add('active');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            console.log('Menu opened manually');
        }
    } else {
        console.log('Required elements not found for manual toggle');
    }
}

// Run tests when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, running mobile menu tests...');
    
    // Test immediately
    testMobileMenuElements();
    
    // Test after a delay
    setTimeout(() => {
        console.log('Delayed test...');
        testMobileMenuElements();
    }, 1000);
    
    // Test after longer delay
    setTimeout(() => {
        console.log('Final test...');
        testMobileMenuElements();
    }, 3000);
});

// Make test functions available globally
window.testMobileMenuElements = testMobileMenuElements;
window.testToggleMenu = testToggleMenu;

console.log('Test functions available: testMobileMenuElements(), testToggleMenu()');
