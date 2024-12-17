// const cells = document.querySelectorAll('.cell')
// const titleHeader = document.querySelector('#titleHeader')
// const xPlayerDisplay = document.querySelector('#xPlayerDisplay')
// const oPlayerDisplay = document.querySelector('#oPlayerDisplay')
// const restartBtn = document.querySelector('#restartBtn')

// // Initialize variables for the game
// let player = 'X'
// let isPauseGame = false
// let isGameStart = false

// // Array of win conditions
// const inputCells = ['', '', '',
//                     '', '', '',
//                     '', '', '']

// // Array of win conditions
// const winConditions = [
//     [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
//     [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
//     [0, 4, 8], [2, 4, 6] // Diagonals
// ]

// // Add click event listeners to each cell
// cells.forEach((cell, index) => {
//     cell.addEventListener('click', () => tapCell(cell, index))
// })

// function tapCell(cell, index) {
//     // Ensure cell is empty and game isn't paused
//     if (cell.textContent == '' &&
//         !isPauseGame
//     ) {
//         isGameStart = true
//         updateCell(cell, index)

//         // Do a random pick if there are no results
//         if (!checkWinner()) {
//             changePlayer()
//             randomPick()
//         }
//     }
// }

// function updateCell(cell, index) {
//     cell.textContent = player
//     inputCells[index] = player
//     cell.style.color = (player == 'X') ? '#1892EA' : '#A737FF'
// }

// function changePlayer() {
//     player = (player == 'X') ? 'O' : 'X'
// }

// function randomPick() {
//     // Pause the game to allow Computer to pick
//     isPauseGame = true

//     setTimeout(() => {
//         let randomIndex
//         do {
//             // Pick a random index
//             randomIndex = Math.floor(Math.random() * inputCells.length)
//         } while (
//             // Ensure the chosen cell is empty
//             inputCells[randomIndex] != ''
//         )

//         // Update the cell with Computer move
//         updateCell(cells[randomIndex], randomIndex, player)
//         // Check if Computer not won
//         if (!checkWinner()) {
//             changePlayer()
//             // Swith back to Human player
//             isPauseGame = false
//             return
//         }
//         player = (player == 'X') ? 'O' : 'X'
//     }, 1000) // Delay Computer move by 1 second
// }

// function checkWinner() {
//     for (const [a, b, c] of winConditions) {
//         // Check each winning condition
//         if (inputCells[a] == player &&
//             inputCells[b] == player &&
//             inputCells[c] == player
//         ) {
//             declareWinner([a, b, c])
//             return true
//         }
//     }

//     // Check for a draw (if all cells are filled)
//     if (inputCells.every(cell => cell != '')) {
//         declareDraw()
//         return true
//     }
// }

// function declareWinner(winningIndices) {
//     titleHeader.textContent = `${player} Win`
//     isPauseGame = true

//     // Highlight winning cells
//     winningIndices.forEach((index) =>
//         cells[index].style.background = '#2A2343'
//     )

//     restartBtn.style.visibility = 'visible'
// }

// function declareDraw() {
//     titleHeader.textContent = 'Draw!'
//     isPauseGame = true
//     restartBtn.style.visibility = 'visible'
// }

// function choosePlayer(selectedPlayer) {
//     // Ensure the game hasn't started
//     if (!isGameStart) {
//         // Override the selected player value
//         player = selectedPlayer
//         if (player == 'X') {
//             // Hightlight X display
//             xPlayerDisplay.classList.add('player-active')
//             oPlayerDisplay.classList.remove('player-active')
//         } else {
//             // Hightlight O display
//             xPlayerDisplay.classList.remove('player-active')
//             oPlayerDisplay.classList.add('player-active')
//         }
//     }
// }

// restartBtn.addEventListener('click', () => {
//     restartBtn.style.visibility = 'hidden'
//     inputCells.fill('')
//     cells.forEach(cell => {
//         cell.textContent = ''
//         cell.style.background = ''
//     })
//     isPauseGame = false
//     isGameStart = false
//     titleHeader.textContent = 'Choose'
// })


// Define chess pieces
const pieces = {
    white: {
        king: '♔',
        queen: '♕',
        bishop: '♗',
        knight: '♘',
        rook: '♖',
        pawn: '♙',
    },
    black: {
        king: '♚',
        queen: '♛',
        bishop: '♝',
        knight: '♞',
        rook: '♜',
        pawn: '♟',
    },
};

// Initialize the chessboard
const board = document.getElementById('chess-board');

// Generate the 8x8 chessboard
function generateBoard() {
    const squares = [];
    let piece = '';

    for (let i = 0; i < 64; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-index', i);

        // Place pieces on the board
        if (i >= 8 && i < 16) {
            square.innerHTML = pieces.black.pawn; // Black pawns
        } else if (i >= 48 && i < 56) {
            square.innerHTML = pieces.white.pawn; // White pawns
        } else if (i === 0 || i === 7) {
            square.innerHTML = pieces.black.rook;
        } else if (i === 1 || i === 6) {
            square.innerHTML = pieces.black.knight;
        } else if (i === 2 || i === 5) {
            square.innerHTML = pieces.black.bishop;
        } else if (i === 3) {
            square.innerHTML = pieces.black.queen;
        } else if (i === 4) {
            square.innerHTML = pieces.black.king;
        } else if (i >= 56 && i < 64) {
            if (i === 56 || i === 63) square.innerHTML = pieces.white.rook;
            else if (i === 57 || i === 62) square.innerHTML = pieces.white.knight;
            else if (i === 58 || i === 61) square.innerHTML = pieces.white.bishop;
            else if (i === 59) square.innerHTML = pieces.white.queen;
            else if (i === 60) square.innerHTML = pieces.white.king;
        }

        squares.push(square);
        board.appendChild(square);
    }

    makePiecesDraggable();
}

// Make the pieces draggable
function makePiecesDraggable() {
    const piecesElements = document.querySelectorAll('.piece');
    
    piecesElements.forEach(piece => {
        piece.setAttribute('draggable', 'true');

        piece.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.innerHTML);
            e.target.classList.add('dragging');
        });

        piece.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });
    });

    addDropZones();
}

// Add drop zones for valid moves
function addDropZones() {
    const squares = document.querySelectorAll('.square');

    squares.forEach(square => {
        square.addEventListener('dragover', (e) => {
            e.preventDefault();
            square.classList.add('droppable');
        });

        square.addEventListener('dragleave', () => {
            square.classList.remove('droppable');
        });

        square.addEventListener('drop', (e) => {
            e.preventDefault();
            const droppedPiece = e.dataTransfer.getData('text');
            square.innerHTML = droppedPiece;
            e.target.classList.remove('droppable');
        });
    });
}

generateBoard();
