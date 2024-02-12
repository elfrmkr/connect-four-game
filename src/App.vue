<script setup>
</script>

<template>
  <div class="container">
    <div class="player-selection">
      <p>Select your color:</p>
      <label>
        <input type="radio" v-model="playerColor" value="player1" /> Player 1 (Red)
      </label>
      <label>
        <input type="radio" v-model="playerColor" value="player2" /> Player 2 (Blue)
      </label>
    </div>
    <div class="grid-container">
      <div v-for="(col, colIndex) in grid" :key="colIndex" class="column">
        <div v-for="(cell, rowIndex) in col" :key="rowIndex" class="grid-item"
          :class="{ 'player1': cell === PLAYER1, 'player2': cell === PLAYER2 }" @click="dropChip(rowIndex)">
          {{ cell }}
        </div>
      </div>
    </div>
    <div class="player-info">
      <p v-if="winner !== null">{{ winner ? `Player ${currentPlayer} wins!` : 'It\'s a draw!' }}</p>
      <p v-else>Current Turn: Player {{ currentPlayer }}</p>
    </div>
    <button @click="resetGame">Reset Game</button>
  </div>
</template>

<script>
const ROWS = 6;
const COLS = 7;
const EMPTY_STATE = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;

export default {
  data() {
    return {
      grid: [],
      winner: null,
      currentPlayer: PLAYER1,
      playerColor: "player1",
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
          this.currentPlayer = this.currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
          break;
        }
        rowNumber--;
      }
      if (rowNumber < 0) {
        console.log("no row to play");
      }
      console.table(this.grid);
    },

    checkWin(row, col) {
      let verticalCount = 0;
      let horizontalCount = 0;
      let diagonalCount = 0;

      //col 
      for (let i = row; i < ROWS; i++) {
        if (this.grid[i][col] === this.currentPlayer) {
          verticalCount++;
          if (verticalCount === 4) {
            return true;
          }
        } else {
          verticalCount = 0;
        }
      }

      //col -3 to col + 3 
      for (let i = 0; i < COLS; i++) {
        if (this.grid[row][i] === this.currentPlayer) {
          horizontalCount++;
          if (horizontalCount === 4) {
            console.log(`player ${this.currentPlayer} wins`);
          }
        } else {
          horizontalCount = 0
        }
      }

      //diagonal
      // Diagonal from bottom-left to top-right
      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          if (this.grid[j][i] === this.currentPlayer) {
            diagonalCount++;
            if (diagonalCount === 4) {
              console.log(`player ${this.currentPlayer} wins`);
            }
          } else {
            diagonalCount = 0;
          }
        }
      }

      // Diagonal from top-left to bottom-right
      for (let i = 0; i < COLS; i++) {
        for (let j = ROWS - 1; j >= 0; j--) {
          if (this.grid[j][i] === this.currentPlayer) {
            diagonalCount++;
            if (diagonalCount === 4) {
              console.log(`player ${this.currentPlayer} wins`);
            }
          } else {
            diagonalCount = 0;
          }
        }
      }

      if (verticalCount >= 4 || horizontalCount >= 4 || diagonalCount >= 4) {
        this.winner = true;
        console.log(`player ${this.currentPlayer} wins`);
        return true;
      }

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
      this.currentPlayer = PLAYER1;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.player-selection {
  margin-bottom: 20px;
}

.grid-container {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  /* Adjust the number of rows as needed */
  gap: 5px;
  /* Adjust the gap between grid items */
}

.column {
  display: flex;
  flex-direction: row;
}

.grid-item {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: black;
}

.player1 {
  background-color: #ff6347;
  /* Light Coral */
}

.player2 {
  background-color: #4169e1;
  /* Royal Blue */
}

.player-info {
  margin-top: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
