document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number');
    const animationDuration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60 FPS

    counters.forEach(counter => {
        const targetText = counter.textContent.trim();
        let targetValue = 0;
        let prefix = '';
        let suffix = '';

        // --- Parse the target value and prefix/suffix --- 
        // Match numbers (including decimals) and optional prefix/suffix
        const match = targetText.match(/^([^\d]*)(\d*\.?\d+)(.*)$/);
        
        if (match) {
            prefix = match[1] || ''; // Capture prefix (like "Up to ")
            targetValue = parseFloat(match[2]); // Capture the number
            suffix = match[3] || ''; // Capture suffix (like "%" or "X")
        } else {
            // Fallback if no number found (shouldn't happen with current data)
            console.warn(`Could not parse number from: ${targetText}`);
            counter.textContent = targetText; // Display original text
            return; // Skip animation for this counter
        }

        const totalFrames = Math.round(animationDuration / frameDuration);
        const increment = targetValue / totalFrames;
        let currentVal = 0;
        let currentFrame = 0;

        const updateCounter = () => {
            currentFrame++;
            currentVal += increment;

            if (currentFrame < totalFrames) {
                // Determine decimal places based on target value
                const decimalPlaces = (targetValue % 1 !== 0) ? 1 : 0;
                counter.textContent = prefix + currentVal.toFixed(decimalPlaces) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                // Ensure final value is exactly the target
                counter.textContent = prefix + targetValue.toFixed((targetValue % 1 !== 0) ? 1 : 0) + suffix;
            }
        };

        // Start the animation
        requestAnimationFrame(updateCounter);
    });
}); 