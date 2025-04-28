/**
 * SVG Building Splitter Utility
 * 
 * This script helps with splitting a building SVG into separate layers
 * to create a multi-layer animation effect. It's meant to be run
 * in the browser console when viewing the SVG directly.
 */

function splitBuildingSvg() {
    // Make sure we're viewing the SVG directly
    if (!document.querySelector('svg')) {
        console.error('No SVG found on page. Please open the SVG file directly in browser.');
        return;
    }
    
    const svg = document.querySelector('svg');
    const svgNS = svg.namespaceURI;
    
    // Create background, middle, and foreground SVGs
    const bgSvg = svg.cloneNode(true);
    const middleSvg = svg.cloneNode(true);
    const frontSvg = svg.cloneNode(true);
    
    // Add identifiers
    bgSvg.setAttribute('id', 'building-layer-bg');
    middleSvg.setAttribute('id', 'building-layer-middle');
    frontSvg.setAttribute('id', 'building-layer-front');
    
    // Strategy 1: Split by vertical position (bottom third, middle third, top third)
    function splitByVerticalPosition() {
        const svgHeight = parseFloat(svg.getAttribute('height') || svg.viewBox.baseVal.height);
        
        // Get all paths and groups in each SVG
        const bgElements = Array.from(bgSvg.querySelectorAll('path, g'));
        const middleElements = Array.from(middleSvg.querySelectorAll('path, g'));
        const frontElements = Array.from(frontSvg.querySelectorAll('path, g'));
        
        // Remove elements not in the respective third of the SVG
        bgElements.forEach(el => {
            const bbox = el.getBBox();
            // Keep only bottom-third elements
            if (bbox.y + bbox.height < svgHeight * 0.6) {
                el.remove();
            }
        });
        
        middleElements.forEach(el => {
            const bbox = el.getBBox();
            // Keep only middle-third elements
            if (bbox.y > svgHeight * 0.6 || bbox.y + bbox.height < svgHeight * 0.3) {
                el.remove();
            }
        });
        
        frontElements.forEach(el => {
            const bbox = el.getBBox();
            // Keep only top-third elements
            if (bbox.y > svgHeight * 0.3) {
                el.remove();
            }
        });
    }
    
    // Strategy 2: Split by horizontal sections (left, middle, right)
    function splitByHorizontalPosition() {
        const svgWidth = parseFloat(svg.getAttribute('width') || svg.viewBox.baseVal.width);
        
        // Get all paths and groups in each SVG
        const bgElements = Array.from(bgSvg.querySelectorAll('path, g'));
        const middleElements = Array.from(middleSvg.querySelectorAll('path, g'));
        const frontElements = Array.from(frontSvg.querySelectorAll('path, g'));
        
        // Remove elements not in the respective third of the SVG
        bgElements.forEach(el => {
            const bbox = el.getBBox();
            // Keep only left third elements
            if (bbox.x > svgWidth * 0.33) {
                el.remove();
            }
        });
        
        middleElements.forEach(el => {
            const bbox = el.getBBox();
            // Keep only middle third elements
            if (bbox.x < svgWidth * 0.33 || bbox.x > svgWidth * 0.66) {
                el.remove();
            }
        });
        
        frontElements.forEach(el => {
            const bbox = el.getBBox();
            // Keep only right third elements
            if (bbox.x < svgWidth * 0.66) {
                el.remove();
            }
        });
    }
    
    // Choose which strategy to use based on your SVG
    // splitByVerticalPosition(); // Uncomment to use vertical splitting
    // splitByHorizontalPosition(); // Uncomment to use horizontal splitting
    
    // Create dummy containers to generate output
    const container = document.createElement('div');
    container.style.display = 'none';
    container.innerHTML = '<div id="bg"></div><div id="middle"></div><div id="front"></div>';
    document.body.appendChild(container);
    
    document.getElementById('bg').appendChild(bgSvg);
    document.getElementById('middle').appendChild(middleSvg);
    document.getElementById('front').appendChild(frontSvg);
    
    // Generate downloadable SVGs
    console.log('BACKGROUND SVG:');
    console.log(document.getElementById('bg').innerHTML);
    console.log('\nMIDDLE SVG:');
    console.log(document.getElementById('middle').innerHTML);
    console.log('\nFRONT SVG:');
    console.log(document.getElementById('front').innerHTML);
    
    // Clean up
    container.remove();
    
    console.log('\nCopy each section above and save as separate SVG files.');
    console.log('Then use them in your HTML with the classes: building-layer-bg, building-layer-middle, building-layer-front');
}

// The function above needs to be run directly in the browser console
// after opening the SVG file directly in the browser.
console.log('To split the building SVG into layers:');
console.log('1. Open the building SVG directly in your browser');
console.log('2. Open browser console (F12 or right-click > Inspect > Console)');
console.log('3. Copy this entire script and paste it in the console');
console.log('4. Call the splitBuildingSvg() function in the console');
console.log('5. Copy the generated SVG code for each layer');

// Optionally provide a simplified way to create layers by editing styles
function createBuildingLayers() {
    const originalSvgPath = '/assets/images/building-vector-png-clipart-background.svg';
    
    // Create three containers for the building layers
    const container = document.querySelector('#animated-hero-advanced .absolute.inset-0.-z-20');
    
    if (!container) {
        console.error('Hero container not found. Make sure you have the correct HTML structure.');
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create three building layers with different styling
    const layers = [
        { class: 'building-layer-bg', style: 'filter: brightness(0.85) contrast(0.9); opacity: 0.9;', delay: '0ms' },
        { class: 'building-layer-middle', style: 'filter: brightness(0.95) contrast(1); opacity: 0.95;', delay: '200ms' },
        { class: 'building-layer-front', style: 'filter: brightness(1) contrast(1.05); opacity: 1;', delay: '400ms' }
    ];
    
    layers.forEach(layer => {
        const wrapper = document.createElement('div');
        wrapper.className = 'building-animation-wrapper';
        wrapper.setAttribute('aria-hidden', 'true');
        
        const img = document.createElement('img');
        img.src = originalSvgPath;
        img.alt = '';
        img.className = `building-animation ${layer.class} w-full h-auto`;
        img.style = layer.style;
        img.dataset.delay = layer.delay;
        
        wrapper.appendChild(img);
        container.appendChild(wrapper);
    });
    
    console.log('Building layers created successfully!');
}

// Export functions if used as a module
if (typeof module !== 'undefined') {
    module.exports = {
        splitBuildingSvg,
        createBuildingLayers
    };
} 