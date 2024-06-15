document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const squares = document.querySelectorAll('.square');
    const resetButton = document.getElementById('reset-btn');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleSquareClick(index) {
        if (gameState[index] === '' && gameActive) {
            gameState[index] = currentPlayer;
            squares[index].textContent = currentPlayer;
            if (checkForWin()) {
                announceWinner();
                gameActive = false;
            } else if (checkForDraw()) {
                announceDraw();
                gameActive = false;
            } else {
                togglePlayer();
            }
        }
    }

    function checkForWin() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    }

    function checkForDraw() {
        return !gameState.includes('');
    }

    function announceWinner() {
        alert(`Player ${currentPlayer} wins!`);
    }

    function announceDraw() {
        alert('It\'s a draw!');
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function resetGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        squares.forEach(square => square.textContent = '');
    }

    squares.forEach(square => {
        square.addEventListener('click', () => {
            handleSquareClick(parseInt(square.getAttribute('data-index')));
        });
    });

    resetButton.addEventListener('click', resetGame);
});
