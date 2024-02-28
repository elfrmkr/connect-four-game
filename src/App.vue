<template>
  <div class="container">
    <div class="player-selection" v-if="!colorConfirmed">
      <p>Select your color:</p>
      <label>
        <input type="radio" @click="changeCurrentPlayer(1)" name="playerSelection" /> Player 1 (Red)
      </label>
      <label>
        <input type="radio" @click="changeCurrentPlayer(2)" name="playerSelection" /> Player 2 (Blue)
      </label>
      <button @click="confirmColor">Confirm Selection</button>
    </div>


    <div class="grid-container" v-else>
      <div v-for="(col, colIndex) in grid" :key="colIndex" class="column">
        <div v-for="(cell, rowIndex) in col" :key="rowIndex" class="grid-item"
          :class="{ 'player1': cell == PLAYER1, 'player2': cell == PLAYER2 }" @click="dropChip(rowIndex)">
          {{ cell }}
        </div>
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
const PLAYER1 = 1;
const PLAYER2 = 2;

export default {
  data() {
    return {
      grid: [],
      winner: null,
      currentPlayer: PLAYER1,
      colorConfirmed: false,
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
        window.alert("no row to play");
      }
      console.table(this.grid);
    },

    checkWin(row, col) {
      if (this.checkDiagonalWin(row, col) || this.checkReverseDiagonalWin(row, col)) {
        window.alert(`Player ${this.currentPlayer} wins`);
        return true;
      }

      // Check vertical
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

      // Check horizontal
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

      return false; // No win detected
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

    changeCurrentPlayer(player) {
      this.currentPlayer = player;
    },

    confirmColor() {
      this.colorConfirmed = true;
    },

    resetGame() {
      this.grid = this.generateGrid(ROWS, COLS);
      this.winner = null;
      this.colorConfirmed = false;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Center vertically */
  height: 100vh;
  /* 100% of the viewport height */
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
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  /* Add a subtle shadow */

}

.grid-item div {
  width: 100%;
  height: 100%;
  border-radius: 50%;
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
