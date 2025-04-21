document.addEventListener('DOMContentLoaded', function() {
    // Set the effective date
    const effectiveDate = new Date();
    document.getElementById('effective-date').textContent = 
        effectiveDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

    // Add print functionality if needed
    const printPage = () => {
        window.print();
    };

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});