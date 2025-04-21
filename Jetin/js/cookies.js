document.addEventListener('DOMContentLoaded', function() {
    // Set the last updated date
    const updateDate = new Date();
    document.getElementById('update-date').textContent = 
        updateDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

    // Show cookie banner button functionality
    const showBannerBtn = document.getElementById('show-banner-btn');
    if (showBannerBtn) {
        showBannerBtn.addEventListener('click', function() {
            // This assumes you have the cookie consent banner implemented
            const cookieBanner = document.getElementById('cookieConsentBanner');
            if (cookieBanner) {
                cookieBanner.classList.add('active');
                cookieBanner.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('Cookie banner not found. Please accept cookies through your browser settings.');
            }
        });
    }

    // Add print button functionality if needed
    const printPage = () => {
        window.print();
    };
});

// If you need to interact with the cookie consent functions
function manageCookiePreferences() {
    // This would trigger your cookie settings modal
    const cookieModal = document.getElementById('cookieSettingsModal');
    if (cookieModal) {
        cookieModal.classList.add('active');
    }
}