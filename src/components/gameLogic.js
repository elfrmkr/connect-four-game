const ROWS = 6;
const COLS = 7;
const EMPTY_STATE = 0;

function generateGrid(rows, cols) {
    return Array.from({ length: rows }, () => Array(cols).fill(EMPTY_STATE));
}

function checkVerticalWin(grid, currentPlayer, row, col) {
    let verticalCount = 0;
    for (let i = row; i < ROWS; i++) {
        if (grid[i][col] === currentPlayer) {
            verticalCount++;
            if (verticalCount === 4) {
                return true;
            }
        } else {
            verticalCount = 0;
        }
    }
    return false;
}

function checkHorizontalWin(grid, currentPlayer, row) {
    let horizontalCount = 0;
    for (let i = 0; i < COLS; i++) {
        if (grid[row][i] === currentPlayer) {
            horizontalCount++;
            if (horizontalCount === 4) {
                return true;
            }
        } else {
            horizontalCount = 0;
        }
    }
    return false;
}

function checkDiagonalWin(grid, currentPlayer, row, col) {
    const diagonalCount1 = checkDiagonal(grid, currentPlayer, row, col, 1, -1);
    const diagonalCount2 = checkDiagonal(grid, currentPlayer, row, col, 1, 1);

    return diagonalCount1 >= 4 || diagonalCount2 >= 4;
}

function checkReverseDiagonalWin(grid, currentPlayer, row, col) {
    const diagonalCount1 = checkDiagonal(grid, currentPlayer, row, col, -1, -1);
    const diagonalCount2 = checkDiagonal(grid, currentPlayer, row, col, -1, 1);

    return diagonalCount1 >= 4 || diagonalCount2 >= 4;
}

function checkDiagonal(grid, currentPlayer, row, col, rowDirection, colDirection) {
    let diagonalCount = 1; // Start with 1 to count the current position
    let i = 1;

    while (
        row + i * rowDirection >= 0 &&
        row + i * rowDirection < grid.length &&
        col + i * colDirection >= 0 &&
        col + i * colDirection < grid[0].length &&
        grid[row + i * rowDirection][col + i * colDirection] === currentPlayer
    ) {
        diagonalCount++;
        i++;
    }

    i = 1;

    while (
        row - i * rowDirection >= 0 &&
        row - i * rowDirection < grid.length &&
        col - i * colDirection >= 0 &&
        col - i * colDirection < grid[0].length &&
        grid[row - i * rowDirection][col - i * colDirection] === currentPlayer
    ) {
        diagonalCount++;
        i++;
    }

    return diagonalCount;
}


function checkDraw(grid) {
    return grid[0].every((cell) => cell !== EMPTY_STATE);
}

function dropChip(grid, currentPlayer, col) {
    const row = findEmptyRow(grid, col);
    if (row !== -1) {
        grid[row][col] = currentPlayer;
    }
}

function findEmptyRow(grid, col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (grid[row][col] === EMPTY_STATE) {
            return row;
        }
    }
    return -1;
}

function checkWin(grid, currentPlayer, row, col) {
    return (
        checkVerticalWin(grid, currentPlayer, row, col) ||
        checkHorizontalWin(grid, currentPlayer, row) ||
        checkDiagonalWin(grid, currentPlayer, row, col) ||
        checkReverseDiagonalWin(grid, currentPlayer, row, col)
    );
}

export {
    findEmptyRow,
    generateGrid,
    checkDraw,
    dropChip,
    checkWin
}
