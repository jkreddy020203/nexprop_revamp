// Building Animation Script

document.addEventListener('DOMContentLoaded', function() {
    // Reset animation on page load to ensure it plays correctly
    const buildingElement = document.querySelector('.building-animation');
    
    if (buildingElement) {
        // Force a repaint to ensure animation plays correctly
        void buildingElement.offsetWidth;
        
        // Add a class to trigger animation if using scroll-based animations
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            // Check if the element is in the viewport on load
            if (isInViewport(element)) {
                element.classList.add('animate');
            }
        });
        
        // Optional: Add staggered animation to multiple buildings if needed
        const buildingElements = document.querySelectorAll('.building-element');
        buildingElements.forEach((building, index) => {
            building.style.animationDelay = `${index * 0.15}s`;
        });
    }
    
    // For scroll-based animations
    window.addEventListener('scroll', debounce(function() {
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('animate');
            }
        });
    }, 50));
    
    // Helper function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Debounce function to limit scroll event firing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Preload images function for smoother animations
    function preloadImages() {
        const imageUrls = [
            '/assets/images/building-vector-png-clipart-background.svg'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    // Preload animation images
    preloadImages();
    
    // Restart animation when tab becomes visible again
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && buildingElement) {
            // Reset animation when tab becomes visible
            buildingElement.style.animation = 'none';
            void buildingElement.offsetWidth; // Trigger reflow
            buildingElement.style.animation = '';
        }
    });
}); 