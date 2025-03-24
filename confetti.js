// Floating leaves animation configuration
const leavesConfig = {
    colors: ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'],
    count: 30,  // Increased number of leaves
    sizes: [12, 16, 20, 24, 28],  // Different leaf sizes
    speed: 3
};

// Create a leaf element
function createLeaf() {
    const leaf = document.createElement('div');
    const size = leavesConfig.sizes[Math.floor(Math.random() * leavesConfig.sizes.length)];
    const rotation = Math.random() * 360;
    const swayAmount = 50 + Math.random() * 50;  // Random sway distance
    const uniqueId = 'leaf-' + Math.random().toString(36).substr(2, 9);
    
    leaf.className = 'floating-leaf';
    leaf.id = uniqueId;
    leaf.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${leavesConfig.colors[Math.floor(Math.random() * leavesConfig.colors.length)]};
        border-radius: 50% 0 50% 50%;
        transform: rotate(${rotation}deg);
        opacity: 0.7;
        pointer-events: none;
        z-index: 1;
        left: ${Math.random() * 100}%;
        top: -20px;
    `;

    // Add unique animation for each leaf
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-${uniqueId} {
            0% {
                transform: translateY(0) rotate(${rotation}deg) translateX(0);
                opacity: 0.7;
            }
            25% {
                transform: translateY(25vh) rotate(${rotation + 90}deg) translateX(${swayAmount}px);
                opacity: 0.8;
            }
            50% {
                transform: translateY(50vh) rotate(${rotation + 180}deg) translateX(-${swayAmount}px);
                opacity: 0.7;
            }
            75% {
                transform: translateY(75vh) rotate(${rotation + 270}deg) translateX(${swayAmount}px);
                opacity: 0.6;
            }
            100% {
                transform: translateY(100vh) rotate(${rotation + 360}deg) translateX(0);
                opacity: 0;
            }
        }
        #${uniqueId} {
            animation: float-${uniqueId} ${8 + Math.random() * 4}s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);

    return leaf;
}

// Initialize floating leaves
function initFloatingLeaves() {
    const mainContainer = document.querySelector('main');
    if (!mainContainer) return;

    // Create wrapper for leaves
    const leavesWrapper = document.createElement('div');
    leavesWrapper.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
    `;
    mainContainer.appendChild(leavesWrapper);

    // Add leaves with staggered delays
    for (let i = 0; i < leavesConfig.count; i++) {
        const leaf = createLeaf();
        leaf.style.animationDelay = `${(i / leavesConfig.count) * 5}s`;
        leavesWrapper.appendChild(leaf);
    }
}

// Start animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    initFloatingLeaves();
}); 