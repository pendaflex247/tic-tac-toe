const board = document.getElementById('game-board');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const newGameButton = document.getElementById('new-game-button');
let currentPlayer = 'X';
const cells = [];

// Create the game board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    board.appendChild(cell);
    cells.push(cell);

    cell.addEventListener('click', () => {
        if (cell.textContent === '' && !checkWinner()) {
            cell.textContent = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (checkWinner()) {
                showResult(`${currentPlayer === 'X' ? 'O' : 'X'} wins!`);
            } else if (isBoardFull()) {
                showResult("It's a draw!");
            }
        }
    });
}

newGameButton.addEventListener('click', () => {
    resetGame();
});

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
            cells[a].style.backgroundColor = 'lightgreen';
            cells[b].style.backgroundColor = 'lightgreen';
            cells[c].style.backgroundColor = 'lightgreen';
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    return cells.every(cell => cell.textContent !== '');
}

function showResult(message) {
    resultMessage.textContent = message;
    resultScreen.classList.remove('hidden');
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#fff';
    });
    resultScreen.classList.add('hidden');
    currentPlayer = 'X';
}
