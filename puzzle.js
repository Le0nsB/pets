// Global variables
let timer;
let seconds = 0;
let puzzlePieces = [];
let puzzleComplete = false;

// Start the timer
function startTimer() {
    timer = setInterval(function () {
        seconds++;
        document.getElementById('timer').innerText = `Time: ${seconds}s`;
    }, 1000);
}

// Stop the timer
function stopTimer() {
    clearInterval(timer);
}

// Shuffle puzzle pieces
function shufflePieces() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    const positions = Array.from(pieces).map(piece => piece.style.order);
    const shuffledPositions = positions.sort(() => Math.random() - 0.5);

    pieces.forEach((piece, index) => {
        piece.style.order = shuffledPositions[index];
    });
}

// Check if the puzzle is complete
function checkPuzzle() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    puzzleComplete = Array.from(pieces).every(piece => piece.style.order === piece.dataset.correctOrder);
    
    if (puzzleComplete) {
        stopTimer();
        alert(`Congratulations! You completed the puzzle in ${seconds} seconds.`);
    }
}

// Create puzzle pieces and insert them into the puzzle container
function createPuzzlePieces() {
    const puzzleContainer = document.getElementById('puzzle-container');
    const pieceImages = [
        'puzzle/piece_0_0.png', 'puzzle/piece_0_1.png', 'puzzle/piece_0_2.png', 
        'puzzle/piece_0_3.png', 'puzzle/piece_0_4.png', 'puzzle/piece_1_0.png', 
        'puzzle/piece_1_1.png', 'puzzle/piece_1_2.png', 'puzzle/piece_1_3.png', 
        'puzzle/piece_1_4.png', 'puzzle/piece_2_0.png', 'puzzle/piece_2_1.png', 
        'puzzle/piece_2_2.png', 'puzzle/piece_2_3.png', 'puzzle/piece_2_4.png'
    ];
    
    pieceImages.forEach((image, index) => {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.draggable = true;
        piece.style.backgroundImage = `url(${image})`;
        piece.dataset.correctOrder = index; // Store correct order
        piece.style.order = index; // Initially set the order
        
        // Drag start event
        piece.addEventListener('dragstart', dragStart);
        
        // Drop event
        piece.addEventListener('dragover', dragOver);
        piece.addEventListener('drop', dropPiece);

        puzzleContainer.appendChild(piece);
    });

    shufflePieces();
    startTimer();
}

// Handle the drag start event
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.style.order);
}

// Handle the drag over event
function dragOver(e) {
    e.preventDefault();
}

// Handle the drop event
function dropPiece(e) {
    e.preventDefault();
    const draggedOrder = e.dataTransfer.getData('text/plain');
    const targetOrder = e.target.style.order;

    // Swap the orders of the dragged and target pieces
    e.target.style.order = draggedOrder;
    document.querySelector(`[style*="order: ${draggedOrder}"]`).style.order = targetOrder;
    
    checkPuzzle();
}

// Initialize the puzzle
createPuzzlePieces();
