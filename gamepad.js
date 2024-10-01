// Definiciones de variables
let gamepadConnected = false;
let currentIndex = 0;
let lastMoveTime = 0; // Para controlar el tiempo del último movimiento
const moveInterval = 100; // Disminuir el intervalo para un movimiento más rápido

// Pre-cargar los sonidos al inicio
const sounds = {
    connected: new Audio('sound/Mando_Conectado.wav'),
    disconnected: new Audio('sound/Mando_Desconectado.wav'),
    restart: new Audio('sound/Restart-Mando.wav') // Sonido para reiniciar el juego
};

// Escuchar el evento de conexión del gamepad
window.addEventListener("gamepadconnected", (event) => {
    console.log("Gamepad connected:", event.gamepad);
    gamepadConnected = true;

    // Reproducir el sonido de conexión
    playSound('connected');

    // Verificar si es un DualSense
    if (event.gamepad.id.includes("DualSense")) {
        console.log("Se ha conectado un mando DualSense.");
        loadStylesheet('mandos/estilos/dualsense/dualsense.css'); // Cargar el CSS para DualSense
    }

    requestAnimationFrame(updateGamepad); // Inicia la actualización del gamepad
});

// Escuchar el evento de desconexión del gamepad
window.addEventListener("gamepaddisconnected", () => {
    console.log("Gamepad disconnected");
    gamepadConnected = false;

    // Reproducir el sonido de desconexión
    playSound('disconnected');
});

// Función para cargar un archivo CSS
function loadStylesheet(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    document.head.appendChild(link); // Añadir el enlace al head del documento
}

// Función para reproducir sonidos
function playSound(soundId) {
    const sound = sounds[soundId];
    if (sound) {
        sound.currentTime = 0; // Reiniciar el sonido para que se reproduzca desde el inicio
        sound.play().catch((error) => {
            console.error("Error al reproducir el sonido:", error);
        });
    }
}

// Función para actualizar la entrada del gamepad
function updateGamepad() {
    if (!gamepadConnected) return;

    const gamepad = navigator.getGamepads()[0];
    const currentTime = Date.now();

    // Detectar el botón de aceptar (X en DualSense)
    if (gamepad.buttons[0].pressed) { // '3' es el botón 'X'
        handleCellClickByIndex(currentIndex);
    }

    // Movimiento con D-pad
    if (currentTime - lastMoveTime > moveInterval) {
        let moved = false; // Para controlar si se ha movido

        if (gamepad.buttons[12].pressed) { // '12' es arriba
            if (currentIndex > 2) {
                currentIndex -= 3;
                moved = true;
            }
        }
        if (gamepad.buttons[13].pressed) { // '13' es abajo
            if (currentIndex < 6) {
                currentIndex += 3;
                moved = true;
            }
        }
        if (gamepad.buttons[14].pressed) { // '14' es izquierda
            if (currentIndex % 3 > 0) {
                currentIndex -= 1;
                moved = true;
            }
        }
        if (gamepad.buttons[15].pressed) { // '15' es derecha
            if (currentIndex % 3 < 2) {
                currentIndex += 1;
                moved = true;
            }
        }

        if (moved) {
            lastMoveTime = currentTime; // Actualizar el tiempo del último movimiento
        }
    }

    // Verificar el botón Triángulo
    if (gamepad.buttons[3].pressed) { // '3' es el botón Triángulo
        handleRestartButtonClick(); // Simula el clic en el botón de reiniciar
        playSound('restart'); // Reproducir el sonido de reinicio
    }

    highlightCurrentCell();
    requestAnimationFrame(updateGamepad); // Llama de nuevo a la función
}

// Resaltar la celda actual
function highlightCurrentCell() {
    cells.forEach((cell, index) => {
        cell.style.border = index === currentIndex ? '2px solid #ff0000' : 'none';
    });
}

// Función para hacer clic en la celda basada en el índice
function handleCellClickByIndex(index) {
    const cell = cells[index];
    const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    cell.dispatchEvent(event);
}

// Función para simular clic en el botón de reiniciar
function handleRestartButtonClick() {
    const restartButton = document.getElementById('restartButton'); // Asegúrate de que este ID sea correcto
    if (restartButton) {
        const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        restartButton.dispatchEvent(event); // Dispara el evento click
    }
}
