// Tax Season Modal Handler
(function() {
    const MODAL_STORAGE_KEY = 'taxSeasonModalDismissed';
    const MODAL_DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const FORCE_SHOW = false; // Set to true to force show modal (ignores localStorage)
    
    function initTaxModal() {
        const modal = document.getElementById('tax-season-modal');
        if (!modal) return;
        
        const closeBtn = modal.querySelector('.tax-modal-close');
        const overlay = modal.querySelector('.tax-modal-overlay');
        
        console.log('Initializing tax modal...');
        
        // Show modal immediately when page loads
        setTimeout(() => {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }, 500);
        
        // Close button handler
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        // Overlay click handler
        if (overlay) {
            overlay.addEventListener('click', closeModal);
        }
        
        // ESC key handler
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
        
        function closeModal() {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Don't save to localStorage - modal will show again on next visit
            // localStorage.setItem(MODAL_STORAGE_KEY, Date.now().toString());
        }
        
        // Store closeModal function globally so it can be reused
        window.taxModalClose = closeModal;
    }
    
    // Modal HTML template (inline for reliability)
    const modalHTML = `
<!-- Tax Season Modal -->
<div id="tax-season-modal" class="tax-modal">
    <div class="tax-modal-overlay"></div>
    <div class="tax-modal-content">
        <button class="tax-modal-close" aria-label="Close modal">
            <i class="fas fa-times"></i>
        </button>
        
        <div class="tax-modal-header">
            <div class="tax-modal-icon">
                <i class="fas fa-file-invoice-dollar"></i>
            </div>
            <h2>Effortless Tax Services at Absolute Accountant</h2>
        </div>
        
        <div class="tax-modal-body">
            <p class="tax-modal-intro">
                At Absolute Accountant, we understand that tax season can feel overwhelming, but it doesn't have to. Our commitment is simple: to deliver a seamless, stress-free tax experience that empowers you with clarity, confidence, and timely results.
            </p>
            
            <div class="tax-features">
                <div class="tax-feature">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h3>Streamlined Onboarding</h3>
                        <p>With intuitive document submission through secure portals, you can share your tax information quickly and confidently—no endless emails, no guesswork.</p>
                    </div>
                </div>
                
                <div class="tax-feature">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h3>Personalized Guidance</h3>
                        <p>Our team takes time to understand your unique situation. We proactively identify deductions and credits, maximizing your return while keeping compliance front and center.</p>
                    </div>
                </div>
                
                <div class="tax-feature">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h3>Transparent Communication</h3>
                        <p>You'll receive clear, consistent updates throughout the preparation process. Have questions? Our experts are available to clarify every step.</p>
                    </div>
                </div>
                
                <div class="tax-feature">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h3>Fast & Accurate Delivery</h3>
                        <p>We prepare and review your return with precision, then deliver your completed return efficiently and help you understand what it means for your financial picture.</p>
                    </div>
                </div>
            </div>
            
            <div class="tax-modal-guarantee">
                <p>At Absolute Accountant, ease, accuracy, and exceptional client service are guaranteed. We take pride in not just preparing your taxes, but in elevating your experience from start to finish.</p>
            </div>
        </div>
        
        <div class="tax-modal-footer">
            <h3>Ready to Get Started?</h3>
            <p>Take the first step toward a smoother tax season.</p>
            <p class="tax-modal-cta-text">Book your FREE 30-minute tax strategy session with Nikki today and let us tailor a plan that fits your needs and goals.</p>
            <a href="https://calendar.app.google/U3TfeEn57dB4LWha6" target="_blank" rel="noopener noreferrer" class="tax-modal-cta-btn">
                <i class="fas fa-calendar-check"></i>
                Schedule Your Free 30-Minute Appointment with Nikki
            </a>
        </div>
    </div>
</div>
    `;
    
    // Load modal HTML and initialize
    function loadTaxModal() {
        // Check if modal already exists
        if (document.getElementById('tax-season-modal')) {
            console.log('Tax modal already exists in DOM');
            setTimeout(initTaxModal, 100);
            return;
        }
        
        // Insert modal HTML directly into the page
        const container = document.createElement('div');
        container.innerHTML = modalHTML;
        document.body.appendChild(container.firstElementChild);
        
        console.log('Tax modal HTML inserted into page');
        
        // Initialize modal after a brief delay to ensure DOM is ready
        setTimeout(initTaxModal, 100);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadTaxModal);
    } else {
        loadTaxModal();
    }
    
    // For testing: Clear localStorage to force show modal
    // Run this in browser console: localStorage.removeItem('taxSeasonModalDismissed');
    
    // Expose function to manually show modal (can be called from buttons)
    window.showTaxModal = function() {
        // Ensure modal exists
        let modal = document.getElementById('tax-season-modal');
        if (!modal) {
            loadTaxModal();
            // Wait a bit for modal to be created
            setTimeout(() => {
                modal = document.getElementById('tax-season-modal');
                if (modal) {
                    setupModalHandlers(modal);
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            }, 300);
            return;
        }
        
        // Setup handlers if not already done
        setupModalHandlers(modal);
        
        // Show modal (ignore localStorage when manually triggered)
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };
    
    // Setup modal event handlers
    function setupModalHandlers(modal) {
        const closeBtn = modal.querySelector('.tax-modal-close');
        const overlay = modal.querySelector('.tax-modal-overlay');
        
        // Remove old event listeners by cloning elements
        if (closeBtn) {
            const newCloseBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            newCloseBtn.addEventListener('click', function() {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
        
        if (overlay) {
            const newOverlay = overlay.cloneNode(true);
            overlay.parentNode.replaceChild(newOverlay, overlay);
            newOverlay.addEventListener('click', function() {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
        
        // ESC key handler
        function escHandler(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
        }
        document.addEventListener('keydown', escHandler);
    }
})();
