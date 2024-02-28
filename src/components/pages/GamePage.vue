<template>
    <div class="grid-container">
        <div v-for="(col, colIndex) in grid" :key="colIndex" class="column">
            <div v-for="(cell, rowIndex) in col" :key="rowIndex" class="grid-item" :style="{
                'backgroundColor': (cell === PLAYER1) ? player1BackgroundColor : ((cell === PLAYER2) ? player2BackgroundColor : 'transparent')
            }" @click="dropChip(rowIndex)">
                {{ cell }}
            </div>
        </div>

        <div class="player-info">
            <p v-if="!winner">Current Turn: Player {{ currentPlayer }}</p>
        </div>

        <button @click="resetGame">Reset Game</button>
    </div>
</template>

<script>
const ROWS = 6;
const COLS = 7;
const EMPTY_STATE = 0;

export default {
    props: ['player'],

    data() {
        return {
            grid: [],
            PLAYER1: 1,
            PLAYER2: 2,
            winner: null,
            currentPlayer: this.player,
            player1BackgroundColor: '#e74c3c',
            player2BackgroundColor: '#3498db'
        };
    },

    mounted() {
        this.grid = this.generateGrid(ROWS, COLS);
    },

    methods: {
        generateGrid(rows, cols) {
            const grid = [];
            for (let i = 0; i < rows; i++) {
                grid.push(Array(cols).fill(EMPTY_STATE));
            }
            console.table(grid);
            return grid;
        },

        dropChip(col) {
            if (this.winner !== null) {
                return;
            }
            let rowNumber = ROWS - 1;
            while (rowNumber >= 0) {
                if (this.grid[rowNumber][col] === EMPTY_STATE) {
                    this.grid[rowNumber][col] = this.currentPlayer;

                    if (this.checkWin(rowNumber, col)) {
                        this.winner = true;
                    } else if (this.checkDraw()) {
                        this.winner = false;
                    }
                    this.currentPlayer = this.currentPlayer === this.PLAYER1 ? this.PLAYER2 : this.PLAYER1;
                    break;
                }
                rowNumber--;
            }
            if (rowNumber < 0) {
                window.alert("no row to play");
            }
            console.table(this.grid);
        },

        checkWin(row, col) {
            if (this.checkDiagonalWin(row, col) || this.checkReverseDiagonalWin(row, col)) {
                window.alert(`Player ${this.currentPlayer} wins`);
                return true;
            }

            let verticalCount = 0;
            for (let i = row; i < ROWS; i++) {
                if (this.grid[i][col] === this.currentPlayer) {
                    verticalCount++;
                    if (verticalCount === 4) {
                        window.alert(`Player ${this.currentPlayer} wins`);
                        return true;
                    }
                } else {
                    verticalCount = 0;
                }
            }

            let horizontalCount = 0;
            for (let i = 0; i < COLS; i++) {
                if (this.grid[row][i] === this.currentPlayer) {
                    horizontalCount++;
                    if (horizontalCount === 4) {
                        window.alert(`Player ${this.currentPlayer} wins`);
                        return true;
                    }
                } else {
                    horizontalCount = 0;
                }
            }

            return false;
        },

        checkDiagonalWin(row, col) {
            let diagonalCount = 0;
            for (let i = 0; i < ROWS; i++) {
                if (row + i < ROWS && col + i < COLS && this.grid[row + i][col + i] === this.currentPlayer) {
                    diagonalCount++;
                    if (diagonalCount === 4) {
                        return true;
                    }
                } else {
                    diagonalCount = 0;
                }
            }
            return false;
        },

        checkReverseDiagonalWin(row, col) {
            let diagonalCount = 0;
            for (let i = 0; i < ROWS; i++) {
                if (row - i >= 0 && col + i < COLS && this.grid[row - i][col + i] === this.currentPlayer) {
                    diagonalCount++;
                    if (diagonalCount === 4) {
                        return true;
                    }
                } else {
                    diagonalCount = 0;
                }
            }
            return false;
        },

        checkDraw() {
            for (let i = 0; i < COLS; i++) {
                if (this.grid[0][i] === EMPTY_STATE) {
                    return false;
                }
            }
            return true;
        },

        resetGame() {
            this.grid = this.generateGrid(ROWS, COLS);
            this.winner = null;
        },
    },
};
</script>


<style scoped>
.grid-container {
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    gap: 5px;
}

.column {
    display: flex;
    flex-direction: row;
}

.grid-item {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    color: #606060;
    /* Change text color to a dark color */
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    margin: 8px;
    position: relative;
    /* Add relative positioning for the ::before pseudo-element */
}

.player-info {
    margin-top: 20px;
    font-size: 16px;
}

.grid-item div {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

button {
    background-color: #2ecc71;
    /* Greenish color for button */
    color: #fff;
    padding: 10px 20px;
    font-size: 14px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 15px;
    width: fit-content;
    transition: background-color 0.3s ease;
    /* Smooth hover transition */
}

button:hover {
    background-color: #27ae60;
    /* Darker green on hover */
}
</style>