class Node {
    constructor(value) {
        this.value = value;    // The value stored in this node
        this.left = null;      // Reference to left child
        this.right = null;     // Reference to right child
    }
}

/**
 * Binary Search Tree Class
 * Implements a balanced binary search tree with traversal methods
 */
class BinarySearchTree {
    constructor() {
        this.root = null;      // Root node of the tree
    }

    /**
     * Inserts a single value into the BST
     * @param {number} value - The value to insert
     */
    insert(value) {
        const newNode = new Node(value);
        
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        let parent = null;
        
        while (current) {
            parent = current;
            if (value === current.value) {
                return; // Avoid duplicate values
            }
            if (value < current.value) {
                current = current.left;
                if (!current) {
                    parent.left = newNode;
                }
            } else {
                current = current.right;
                if (!current) {
                    parent.right = newNode;
                }
            }
        }
    }

    /**
     * Creates a balanced BST from a sorted array
     * @param {Array} arr - Sorted array of values
     * @param {number} start - Starting index
     * @param {number} end - Ending index
     * @returns {Node} Root node of the balanced tree
     */
    createBalancedBST(arr, start = 0, end = arr.length - 1) {
        if (start > end) return null;
        
        const mid = Math.floor((start + end) / 2);
        const node = new Node(arr[mid]);
        
        node.left = this.createBalancedBST(arr, start, mid - 1);
        node.right = this.createBalancedBST(arr, mid + 1, end);
        
        return node;
    }

    /**
     * Inserts an array of values as a balanced BST
     * @param {Array} values - Array of values to insert
     */
    insertArray(values) {
        const sortedValues = [...values].sort((a, b) => a - b);
        this.root = this.createBalancedBST(sortedValues);
    }

    /**
     * Pre-order traversal: Root -> Left -> Right
     * @returns {Array} Array of values in pre-order
     */
    preOrder(node = this.root, result = []) {
        if (!node) return result;
        result.push(node.value);
        this.preOrder(node.left, result);
        this.preOrder(node.right, result);
        return result;
    }

    /**
     * In-order traversal: Left -> Root -> Right
     * @returns {Array} Array of values in in-order
     */
    inOrder(node = this.root, result = []) {
        if (!node) return result;
        this.inOrder(node.left, result);
        result.push(node.value);
        this.inOrder(node.right, result);
        return result;
    }

    /**
     * Post-order traversal: Left -> Right -> Root
     * @returns {Array} Array of values in post-order
     */
    postOrder(node = this.root, result = []) {
        if (!node) return result;
        this.postOrder(node.left, result);
        this.postOrder(node.right, result);
        result.push(node.value);
        return result;
    }
}

/**
 * Input Validation and Processing
 */
// Validates user input to ensure it contains valid, unique numbers
function validateInput(input) {
    const cleanInput = input.replace(/[^\d,\s]/g, '').trim();
    if (!cleanInput) return false;
    
    const numbers = cleanInput.split(/[,\s]+/).filter(num => num.trim() !== '');
    if (numbers.length === 0) return false;
    
    // Check if all numbers are valid and unique
    if (!numbers.every(num => !isNaN(num) && num.trim() !== '')) return false;
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) return false;
    
    return true;
}

// Converts input string into array of numbers
function parseInput(input) {
    return input.replace(/[^\d,\s]/g, '')
                .split(/[,\s]+/)
                .filter(num => num.trim() !== '')
                .map(num => parseInt(num.trim()));
}

/**
 * Tree Visualization Functions
 */
// Creates a visual node element for the tree
function createTreeNode(value) {
    const node = document.createElement('div');
    node.className = 'tree-node bg-white border-2 border-green-600 rounded-full w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center font-semibold text-green-800 relative z-10 transition-all duration-300 text-sm sm:text-base shadow-md';
    node.setAttribute('data-value', value);
    node.textContent = value;
    return node;
}

// Draws connecting lines between tree nodes
function drawConnectingLines(container, levels) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.zIndex = "1";
    container.insertBefore(svg, container.firstChild);

    const nodes = container.querySelectorAll('.tree-node');
    const nodeArray = Array.from(nodes);
    let processedNodes = new Set();

    let currentIndex = 0;
    levels.forEach((level, levelIndex) => {
        level.forEach((node) => {
            const parentElement = nodeArray[currentIndex];
            if (!processedNodes.has(parentElement)) {
                const parentRect = parentElement.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                // Draw lines to children
                if (node.left) drawLineToChild(svg, parentRect, containerRect, node.left, nodeArray);
                if (node.right) drawLineToChild(svg, parentRect, containerRect, node.right, nodeArray);

                processedNodes.add(parentElement);
            }
            currentIndex++;
        });
    });
}

// Helper function to draw a line to a child node
function drawLineToChild(svg, parentRect, containerRect, childNode, nodeArray) {
    const childIndex = nodeArray.findIndex(el => 
        parseInt(el.getAttribute('data-value')) === childNode.value
    );
    if (childIndex !== -1) {
        const childElement = nodeArray[childIndex];
        const childRect = childElement.getBoundingClientRect();

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", parentRect.left - containerRect.left + parentRect.width / 2);
        line.setAttribute("y1", parentRect.top - containerRect.top + parentRect.height / 2);
        line.setAttribute("x2", childRect.left - containerRect.left + childRect.width / 2);
        line.setAttribute("y2", childRect.top - containerRect.top + childRect.height / 2);
        line.setAttribute("stroke", "#16a34a");
        line.setAttribute("stroke-width", "1.5");
        svg.appendChild(line);
    }
}

// Creates the visual representation of the tree
function visualizeTree(root, container) {
    container.innerHTML = '';
    if (!root) return;

    const treeContainer = document.createElement('div');
    treeContainer.className = 'relative pt-4 sm:pt-8';
    treeContainer.style.minHeight = '300px';
    container.appendChild(treeContainer);

    // Create levels array for tree structure
    const levels = [];
    const queue = [{node: root, level: 0}];
    
    while (queue.length > 0) {
        const {node, level} = queue.shift();
        if (!levels[level]) levels[level] = [];
        levels[level].push(node);
        
        if (node.left) queue.push({node: node.left, level: level + 1});
        if (node.right) queue.push({node: node.right, level: level + 1});
    }
    
    // Create visual nodes for each level
    levels.forEach((level, i) => {
        const levelDiv = document.createElement('div');
        levelDiv.className = `tree-level flex justify-center items-center space-x-4 sm:space-x-8 md:space-x-16 mb-8 sm:mb-12 md:mb-16`;
        
        level.forEach(node => {
            const nodeDiv = createTreeNode(node.value);
            levelDiv.appendChild(nodeDiv);
        });
        
        treeContainer.appendChild(levelDiv);
    });

    // Draw connecting lines after nodes are positioned
    setTimeout(() => drawConnectingLines(treeContainer, levels), 100);
}

/**
 * Traversal Visualization Functions
 */
let isTraversalInProgress = false;

// Shows a temporary validation message
function showValidationMessage(message) {
    const validationDiv = document.createElement('div');
    validationDiv.className = 'fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg z-50';
    validationDiv.textContent = message;
    document.body.appendChild(validationDiv);
    
    setTimeout(() => validationDiv.remove(), 2000);
}

// Updates the traversal status message
function showTraversalStatus(type) {
    const statusDiv = document.getElementById('traversal-status');
    if (statusDiv) {
        statusDiv.textContent = `${type} traversal is in progress...`;
        statusDiv.style.color = '#1f2937';
    }
}

// Clears the traversal status message
function clearTraversalStatus() {
    const statusDiv = document.getElementById('traversal-status');
    if (statusDiv) statusDiv.textContent = '';
}

// Highlights nodes during traversal
function highlightTraversal(traversalArray, traversalType) {
    if (isTraversalInProgress) return;
    
    isTraversalInProgress = true;
    showTraversalStatus(traversalType);
    
    // Disable buttons during traversal
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.7';
        button.style.cursor = 'not-allowed';
    });
    
    let currentIndex = 0;
    const nodes = document.querySelectorAll('.tree-node');
    
    function highlight() {
        if (currentIndex >= traversalArray.length) {
            // Reset nodes and re-enable buttons
            nodes.forEach(node => {
                node.classList.remove('highlight');
                node.style.backgroundColor = 'white';
                node.style.color = '#166534';
            });
            isTraversalInProgress = false;
            clearTraversalStatus();
            buttons.forEach(button => {
                button.disabled = false;
                button.style.opacity = '1';
                button.style.cursor = 'pointer';
            });
            return;
        }
        
        // Reset all nodes
        nodes.forEach(node => {
            node.classList.remove('highlight');
            node.style.backgroundColor = 'white';
            node.style.color = '#166534';
        });
        
        // Highlight current node
        const value = traversalArray[currentIndex];
        const node = Array.from(nodes).find(node => 
            parseInt(node.getAttribute('data-value')) === value
        );
        
        if (node) {
            node.classList.add('highlight');
            node.style.backgroundColor = '#22c55e';
            node.style.color = '#ffffff';
            currentIndex++;
            setTimeout(highlight, 1000);
        }
    }
    
    highlight();
}

/**
 * Initialize UI Elements and Event Listeners
 */

const bst = new BinarySearchTree();
const generateBtn = document.getElementById('generate-btn');
const generateAnotherBtn = document.getElementById('generate-another');
const numbersInput = document.getElementById('numbers');
const errorMessage = document.getElementById('error-message');
const treeSection = document.getElementById('tree-section');
const treeContainer = document.getElementById('tree-container');
const preOrderBtn = document.getElementById('pre-order');
const inOrderBtn = document.getElementById('in-order');
const postOrderBtn = document.getElementById('post-order');
const traversalStatus = document.getElementById('traversal-status');

// Event Listeners
generateBtn.addEventListener('click', () => {
    const input = numbersInput.value;
    
    if (!validateInput(input)) {
        errorMessage.classList.remove('hidden');
        treeSection.classList.add('hidden');
        return;
    }
    
    errorMessage.classList.add('hidden');
    const values = parseInput(input);
    bst.insertArray(values);
    visualizeTree(bst.root, treeContainer);
    treeSection.classList.remove('hidden');
});

generateAnotherBtn.addEventListener('click', () => {
    numbersInput.value = '';
    treeSection.classList.add('hidden');
    errorMessage.classList.add('hidden');
    clearTraversalStatus();
    bst.root = null;
});

preOrderBtn.addEventListener('click', () => {
    if (!bst.root) return;
    if (isTraversalInProgress) {
        showValidationMessage('Please wait for the current traversal to complete');
        return;
    }
    const traversal = bst.preOrder();
    highlightTraversal(traversal, 'Pre-order');
});

inOrderBtn.addEventListener('click', () => {
    if (!bst.root) return;
    if (isTraversalInProgress) {
        showValidationMessage('Please wait for the current traversal to complete');
        return;
    }
    const traversal = bst.inOrder();
    highlightTraversal(traversal, 'In-order');
});

postOrderBtn.addEventListener('click', () => {
    if (!bst.root) return;
    if (isTraversalInProgress) {
        showValidationMessage('Please wait for the current traversal to complete');
        return;
    }
    const traversal = bst.postOrder();
    highlightTraversal(traversal, 'Post-order');
});

// Initialize page functionality
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('numbers');
    if (inputField) {
        inputField.addEventListener('focus', () => {
            if (inputField.value === inputField.placeholder) {
                inputField.value = '';
            }
        });
    }
});

// Function to generate random numbers
function generateRandomNumbers() {
    const min = 5;  // Minimum number
    const max = 15; // Maximum number
    const count = Math.floor(Math.random() * (max - min + 1)) + min; // Random count between min and max
    
    // Generate unique random numbers
    const numbers = new Set();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * 100) + 1); // Random numbers between 1 and 100
    }
    
    // Convert to array and sort
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    
    // Update the input field
    const inputField = document.getElementById('numbers');
    inputField.value = sortedNumbers.join(', ');
}

// Add event listener for the random number generator button
document.getElementById('generate-random').addEventListener('click', generateRandomNumbers);
