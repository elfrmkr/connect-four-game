<template>
    <div class="grid-container">
        <div v-for="(col, colIndex) in grid" :key="colIndex" class="column">
            <div v-for="(cell, rowIndex) in col" :key="rowIndex" class="grid-item falling-chip" :style="{
                'backgroundColor': (cell === PLAYER1) ? player1BackgroundColor : ((cell === PLAYER2) ? player2BackgroundColor : 'transparent')
            }" @click="dropChip(rowIndex)">
                {{ cell }}
            </div>
        </div>

        <game-result-modal v-if="winner" :win-message="'Player ' + currentPlayer + ' wins'" :player="currentPlayer"
            @new-game="resetGame" />
        <div class="player-info">
            <p v-if="!winner">Current Turn: Player {{ currentPlayer }}</p>
        </div>

        <button @click="resetGame">Reset Game</button>
    </div>
</template>

<script>
import GameResultModal from '@/components/GameResultModal.vue'; // Adjust the path based on your project structure
import {
    findEmptyRow,
    generateGrid,
    checkDraw,
    dropChip,
    checkWin,
} from '@/components/gameLogic.js';

const ROWS = 6;
const COLS = 7;

export default {
    props: ['player'],
    components: {
        GameResultModal,
    },
    data() {
        return {
            PLAYER1: 1,
            PLAYER2: 2,
            winner: null,
            currentPlayer: this.player,
            grid: generateGrid(ROWS, COLS),
            player1BackgroundColor: '#e74c3c',
            player2BackgroundColor: '#3498db'
        };
    },


    methods: {
        dropChip(col) {
            if (this.winner !== null) {
                return;
            }
            const row = findEmptyRow(this.grid, col);

            if (row !== -1) {
                dropChip(this.grid, this.currentPlayer, col);
            }
            if (checkWin(this.grid, this.currentPlayer, row, col)) {
                this.winner = true;
            } else if (checkDraw(this.grid)) {
                this.winner = false;
            }

            if (!this.winner) {
                this.currentPlayer = this.currentPlayer === this.PLAYER1 ? this.PLAYER2 : this.PLAYER1;
            }
        },

        resetGame() {
            this.grid = generateGrid(ROWS, COLS);
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
    border: 1px solid #474747;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    margin-right: 10px;
    margin-top: 10px;
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