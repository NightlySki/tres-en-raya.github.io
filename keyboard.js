const cells = document.querySelectorAll('[data-cell]');
let currentCellIndex = 0;

// Establecer el primer enfoque en la primera celda
cells[currentCellIndex].focus();

// Agregar evento de clic a las celdas
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!cell.innerText) {
            cell.click(); // Llama a la función de clic
        }
    });

    // Asegurarse de que cada celda sea accesible
    cell.setAttribute('tabindex', '0');
});

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (currentCellIndex >= 3) {
                currentCellIndex -= 3; // Moverse hacia arriba
            }
            break;
        case 'ArrowDown':
            if (currentCellIndex < 6) {
                currentCellIndex += 3; // Moverse hacia abajo
            }
            break;
        case 'ArrowLeft':
            if (currentCellIndex % 3 !== 0) {
                currentCellIndex -= 1; // Moverse a la izquierda
            }
            break;
        case 'ArrowRight':
            if (currentCellIndex % 3 !== 2) {
                currentCellIndex += 1; // Moverse a la derecha
            }
            break;
        case 'Enter':
            const cell = cells[currentCellIndex];
            if (!cell.innerText) {
                cell.click(); // Llama a la función de clic
            }
            break;
    }

    // Enfocar la celda actual
    cells[currentCellIndex].focus();
});
