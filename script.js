// Function to toggle accordion sections
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
    const arrow = header.querySelector(".arrow");
    arrow.textContent = arrow.textContent === "▼" ? "▲" : "▼";
}

// Ensure the accordion toggling works after the document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Attach click event listeners to all accordion headers
    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", function() {
            toggleAccordion(header);
        });
    });
});


// Puzzle related code
const puzzleImages = [
    "piece_0_0", "piece_0_1", "piece_0_2", "piece_0_3", "piece_0_4", 
    "piece_1_0", "piece_1_1", "piece_1_2", "piece_1_3", "piece_1_4", 
    "piece_2_0", "piece_2_1", "piece_2_2", "piece_2_3", "piece_2_4"
];

// Shuffle function to randomize the puzzle pieces
function shufflePieces() {
    const shuffled = [...puzzleImages];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Start timer
let timer;
let seconds = 0;
function startTimer() {
    timer = setInterval(() => {
        seconds++;
        document.getElementById('timer').textContent = `Time: ${seconds}s`;
    }, 1000);
}

// Create and add puzzle pieces
function createPuzzle() {
    const shuffledPieces = shufflePieces();
    const puzzleContainer = document.getElementById('puzzle-container');

    shuffledPieces.forEach((image, index) => {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        
        const imageUrl = `url('puzzle/${image}.png')`;  // Correct image path
        piece.style.backgroundImage = imageUrl;

        piece.setAttribute('data-index', index);
        piece.draggable = true;

        piece.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.dataset.index);
        });

        piece.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        piece.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedIndex = e.dataTransfer.getData('text');
            const draggedPiece = document.querySelector(`[data-index='${draggedIndex}']`);
            const targetIndex = piece.dataset.index;
            
            if (draggedPiece !== piece) {
                [draggedPiece.style.backgroundImage, piece.style.backgroundImage] = 
                [piece.style.backgroundImage, draggedPiece.style.backgroundImage];
            }

            checkPuzzleCompletion();
        });

        puzzleContainer.appendChild(piece);
    });

    startTimer();
}

// Check if the puzzle is complete
function checkPuzzleCompletion() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    const isComplete = [...pieces].every(piece => {
        const correctImage = `url('puzzle/${piece.dataset.index}.png')`;
        return piece.style.backgroundImage === correctImage;
    });

    if (isComplete) {
        clearInterval(timer); // Stop the timer
        alert(`Puzzle completed in ${seconds} seconds!`);
    }
}

// Restart the puzzle
document.getElementById('restart-button').addEventListener('click', () => {
    document.getElementById('puzzle-container').innerHTML = '';
    seconds = 0;
    document.getElementById('timer').textContent = 'Time: 0s';
    createPuzzle();
});

// Initialize the puzzle
createPuzzle();
