// Node class for creating tree nodes
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Binary Search Tree class
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // Insert into BST
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

    // Create a balanced BST from sorted array
    createBalancedBST(arr, start = 0, end = arr.length - 1) {
        if (start > end) return null;
        
        const mid = Math.floor((start + end) / 2);
        const node = new Node(arr[mid]);
        
        node.left = this.createBalancedBST(arr, start, mid - 1);
        node.right = this.createBalancedBST(arr, mid + 1, end);
        
        return node;
    }

    // Insert array of values as balanced BST
    insertArray(values) {
        // Sort the values
        const sortedValues = [...values].sort((a, b) => a - b);
        this.root = this.createBalancedBST(sortedValues);
    }

    // Improved traversal methods with better clarity
    preOrder(node = this.root, result = []) {
        if (!node) return result;
        
        // Visit root first
        result.push(node.value);
        
        // Then traverse left subtree
        this.preOrder(node.left, result);
        
        // Finally traverse right subtree
        this.preOrder(node.right, result);
        
        return result;
    }

    inOrder(node = this.root, result = []) {
        if (!node) return result;
        
        // First traverse left subtree
        this.inOrder(node.left, result);
        
        // Then visit root
        result.push(node.value);
        
        // Finally traverse right subtree
        this.inOrder(node.right, result);
        
        return result;
    }

    postOrder(node = this.root, result = []) {
        if (!node) return result;
        
        // First traverse left subtree
        this.postOrder(node.left, result);
        
        // Then traverse right subtree
        this.postOrder(node.right, result);
        
        // Finally visit root
        result.push(node.value);
        
        return result;
    }

    // Helper method to get tree height
    getHeight(node = this.root) {
        if (!node) return 0;
        return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }
}

// Helper function to validate input
function validateInput(input) {
    const cleanInput = input.replace(/[^\d,\s]/g, '').trim();
    if (!cleanInput) return false;
    
    const numbers = cleanInput.split(/[,\s]+/).filter(num => num.trim() !== '');
    if (numbers.length === 0) return false;
    
    // Check if all numbers are valid
    if (!numbers.every(num => !isNaN(num) && num.trim() !== '')) return false;
    
    // Check for unique numbers
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) return false;
    
    return true;
}

// Helper function to parse input string into array of numbers
function parseInput(input) {
    return input.replace(/[^\d,\s]/g, '')
                .split(/[,\s]+/)
                .filter(num => num.trim() !== '')
                .map(num => parseInt(num.trim()));
}

// Improved tree node creation with better styling
function createTreeNode(value) {
    const node = document.createElement('div');
    node.className = 'tree-node bg-white border-2 border-yellow-500 rounded-full w-12 h-12 flex items-center justify-center font-semibold text-gray-800 relative z-10 transition-all duration-300';
    node.setAttribute('data-value', value);
    node.textContent = value;
    return node;
}

// Improved connecting lines with better visibility
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

                // Draw line to left child
                if (node.left) {
                    const leftChildIndex = nodeArray.findIndex(el => 
                        parseInt(el.getAttribute('data-value')) === node.left.value
                    );
                    if (leftChildIndex !== -1) {
                        const leftChildElement = nodeArray[leftChildIndex];
                        const leftChildRect = leftChildElement.getBoundingClientRect();

                        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                        line.setAttribute("x1", parentRect.left - containerRect.left + parentRect.width / 2);
                        line.setAttribute("y1", parentRect.top - containerRect.top + parentRect.height / 2);
                        line.setAttribute("x2", leftChildRect.left - containerRect.left + leftChildRect.width / 2);
                        line.setAttribute("y2", leftChildRect.top - containerRect.top + leftChildRect.height / 2);
                        line.setAttribute("stroke", "#FFD54F");
                        line.setAttribute("stroke-width", "2");
                        svg.appendChild(line);
                    }
                }

                // Draw line to right child
                if (node.right) {
                    const rightChildIndex = nodeArray.findIndex(el => 
                        parseInt(el.getAttribute('data-value')) === node.right.value
                    );
                    if (rightChildIndex !== -1) {
                        const rightChildElement = nodeArray[rightChildIndex];
                        const rightChildRect = rightChildElement.getBoundingClientRect();

                        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                        line.setAttribute("x1", parentRect.left - containerRect.left + parentRect.width / 2);
                        line.setAttribute("y1", parentRect.top - containerRect.top + parentRect.height / 2);
                        line.setAttribute("x2", rightChildRect.left - containerRect.left + rightChildRect.width / 2);
                        line.setAttribute("y2", rightChildRect.top - containerRect.top + rightChildRect.height / 2);
                        line.setAttribute("stroke", "#FFD54F");
                        line.setAttribute("stroke-width", "2");
                        svg.appendChild(line);
                    }
                }

                processedNodes.add(parentElement);
            }
            currentIndex++;
        });
    });
}

// Improved tree visualization with better spacing
function visualizeTree(root, container) {
    container.innerHTML = '';
    if (!root) return;

    const treeContainer = document.createElement('div');
    treeContainer.className = 'relative pt-8';
    treeContainer.style.minHeight = '400px';
    container.appendChild(treeContainer);

    const levels = [];
    const queue = [{node: root, level: 0}];
    
    while (queue.length > 0) {
        const {node, level} = queue.shift();
        
        if (!levels[level]) {
            levels[level] = [];
        }
        
        levels[level].push(node);
        
        if (node.left) queue.push({node: node.left, level: level + 1});
        if (node.right) queue.push({node: node.right, level: level + 1});
    }
    
    // Create and position nodes with improved spacing
    levels.forEach((level, i) => {
        const levelDiv = document.createElement('div');
        levelDiv.className = `tree-level flex justify-center items-center space-x-16 mb-16`;
        
        level.forEach(node => {
            const nodeDiv = createTreeNode(node.value);
            levelDiv.appendChild(nodeDiv);
        });
        
        treeContainer.appendChild(levelDiv);
    });

    // Draw connecting lines after nodes are positioned
    setTimeout(() => drawConnectingLines(treeContainer, levels), 100);
}

// Improved traversal highlighting with better visual feedback
let isTraversalInProgress = false;

function showValidationMessage(message) {
    const validationDiv = document.createElement('div');
    validationDiv.className = 'fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg z-50';
    validationDiv.textContent = message;
    document.body.appendChild(validationDiv);
    
    setTimeout(() => {
        validationDiv.remove();
    }, 2000);
}

function showTraversalStatus(type) {
    const statusDiv = document.getElementById('traversal-status');
    if (statusDiv) {
        statusDiv.textContent = `${type} traversal is in progress...`;
        statusDiv.style.color = '#1f2937';
    }
}

function clearTraversalStatus() {
    const statusDiv = document.getElementById('traversal-status');
    if (statusDiv) {
        statusDiv.textContent = '';
    }
}

function highlightTraversal(traversalArray, traversalType) {
    if (isTraversalInProgress) return;
    
    isTraversalInProgress = true;
    showTraversalStatus(traversalType);
    const buttons = document.querySelectorAll('.custom-button');
    buttons.forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.7';
        button.style.cursor = 'not-allowed';
    });
    
    let currentIndex = 0;
    const nodes = document.querySelectorAll('.tree-node');
    
    function highlight() {
        if (currentIndex >= traversalArray.length) {
            nodes.forEach(node => {
                node.classList.remove('highlight');
                node.style.backgroundColor = 'white';
                node.style.color = '#1f2937';
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
        
        nodes.forEach(node => {
            node.classList.remove('highlight');
            node.style.backgroundColor = 'white';
            node.style.color = '#1f2937';
        });
        
        const value = traversalArray[currentIndex];
        const node = Array.from(nodes).find(node => 
            parseInt(node.getAttribute('data-value')) === value
        );
        
        if (node) {
            node.classList.add('highlight');
            node.style.backgroundColor = '#ffd54f';
            node.style.color = '#000000';
            currentIndex++;
            setTimeout(highlight, 1000);
        }
    }
    
    highlight();
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        const generateBtn = document.getElementById('generate-btn');
        const inputField = document.getElementById('numbers');
        const errorMessage = document.getElementById('error-message');

        if (generateBtn && inputField && errorMessage) {
            inputField.addEventListener('focus', () => {
                if (inputField.value === inputField.placeholder) {
                    inputField.value = '';
                }
            });

            generateBtn.addEventListener('click', () => {
                const input = inputField.value;
                if (!validateInput(input)) {
                    errorMessage.classList.remove('hidden');
                    return;
                }
                
                errorMessage.classList.add('hidden');
                const numbers = parseInput(input);
                localStorage.setItem('treeData', JSON.stringify(numbers));
                window.location.href = 'tree.html';
            });
        }
    } else if (window.location.pathname.endsWith('tree.html')) {
        const treeContainer = document.getElementById('tree-container');
        const errorMessage = document.getElementById('error-message');
        
        if (treeContainer && errorMessage) {
            const treeData = localStorage.getItem('treeData');
            if (!treeData) {
                errorMessage.classList.remove('hidden');
                treeContainer.style.display = 'none';
                return;
            }
            
            const numbers = JSON.parse(treeData);
            const tree = new BinarySearchTree();
            tree.insertArray(numbers);
            
            visualizeTree(tree.root, treeContainer);
            
            const preOrderBtn = document.getElementById('pre-order');
            const inOrderBtn = document.getElementById('in-order');
            const postOrderBtn = document.getElementById('post-order');
            
            if (preOrderBtn && inOrderBtn && postOrderBtn) {
                preOrderBtn.addEventListener('click', () => {
                    if (isTraversalInProgress) {
                        showValidationMessage('Please wait for the current traversal to complete');
                        return;
                    }
                    const traversal = tree.preOrder();
                    highlightTraversal(traversal, 'Pre-order');
                });
                
                inOrderBtn.addEventListener('click', () => {
                    if (isTraversalInProgress) {
                        showValidationMessage('Please wait for the current traversal to complete');
                        return;
                    }
                    const traversal = tree.inOrder();
                    highlightTraversal(traversal, 'In-order');
                });
                
                postOrderBtn.addEventListener('click', () => {
                    if (isTraversalInProgress) {
                        showValidationMessage('Please wait for the current traversal to complete');
                        return;
                    }
                    const traversal = tree.postOrder();
                    highlightTraversal(traversal, 'Post-order');
                });
            }
        }
    }
});