const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restartButton');
const balloonsContainer = document.getElementById('balloons-container'); // Contenedor de globos
const clickSound = document.getElementById('click-sound'); // Sonido de clic
const noWinsSound = document.getElementById('no-wins-sound'); // Sonido de empate
const xWinsSound = document.getElementById('X-Wins'); // Sonido de victoria de X
const oWinsSound = document.getElementById('O-Wins'); // Sonido de victoria de O
const restartSound = document.getElementById('restart-sound'); // Sonido de reinicio

let currentTurn = 'X';
let board = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);
    
    if (board[cellIndex] || checkWinner()) return;

    placeMark(cell, currentTurn);
    
    // Reproduce el sonido de clic
    clickSound.currentTime = 0; // Reinicia el sonido
    clickSound.play(); // Reproduce el sonido

    if (checkWinner()) {
        winnerMessage.innerText = `${currentTurn} Wins!`;
        highlightWinningCells();
        triggerBalloons(); // Llamar a la función de los globos

        // Reproduce el sonido de victoria correspondiente
        if (currentTurn === 'X') {
            xWinsSound.currentTime = 0; // Reinicia el sonido de victoria de X
            xWinsSound.play(); // Reproduce el sonido de victoria de X
        } else {
            oWinsSound.currentTime = 0; // Reinicia el sonido de victoria de O
            oWinsSound.play(); // Reproduce el sonido de victoria de O
        }
    } else if (isDraw()) {
        winnerMessage.innerText = "Es un Empate!";
        triggerBalloons(); // Añadido: llamar a la función de globos en empate
        noWinsSound.currentTime = 0; // Reinicia el sonido de empate
        noWinsSound.play(); // Reproduce el sonido de empate
        blinkCells(); // Añadido: hacer parpadear las celdas
    } else {
        swapTurns();
    }
}

function placeMark(cell, mark) {
    board[Array.from(cells).indexOf(cell)] = mark;
    cell.innerText = mark;
}

function swapTurns() {
    currentTurn = currentTurn === 'X' ? 'O' : 'X';
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentTurn;
        });
    });
}

function highlightWinningCells() {
    const winningCombination = winningCombinations.find(combination => {
        return combination.every(index => {
            return board[index] === currentTurn;
        });
    });

    winningCombination.forEach(index => {
        cells[index].style.backgroundColor = '#28a745';
        cells[index].style.color = '#fff';
    });
}

function isDraw() {
    return board.every(cell => cell);
}

// Función para reiniciar el juego
function restartGame() {
    currentTurn = 'X';
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = '#f4f4f4';
        cell.style.color = '#333';
    });
    winnerMessage.innerText = '';
    clearBalloons(); // Limpiar globos al reiniciar el juego
    clearBlink(); // Limpiar el parpadeo de las celdas
}

// Función para generar globos
function triggerBalloons() {
    for (let i = 0; i < 20; i++) {
        let balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.animationDuration = `${Math.random() * 3 + 3}s`; // Duración aleatoria de 3 a 6 segundos
        balloonsContainer.appendChild(balloon);
    }
}

// Función para eliminar globos después del juego
function clearBalloons() {
    balloonsContainer.innerHTML = '';
}

// Función para hacer parpadear las celdas en caso de empate
function blinkCells() {
    cells.forEach(cell => {
        cell.classList.add('multicolor'); // Añadir clase de parpadeo
    });
}

// Función para limpiar el parpadeo
function clearBlink() {
    cells.forEach(cell => {
        cell.classList.remove('multicolor'); // Quitar clase de parpadeo
    });
}

// Añadir el sonido al botón de reinicio
restartButton.addEventListener('click', () => {
    restartSound.currentTime = 0; // Reinicia el sonido de reinicio
    restartSound.play(); // Reproduce el sonido de reinicio
    restartGame(); // Llama a la función que reinicia el juego
});

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});
