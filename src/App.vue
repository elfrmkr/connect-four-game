<template>
  <div class="container">
    <div class="player-selection" v-if="!colorConfirmed">
      <p>Select your color:</p>
      <label :style="{ backgroundColor: player1BackgroundColor }">
        <input type="radio" @click="changeCurrentPlayer(1)" name="playerSelection" /> Player 1 (Red)
      </label>
      <label :style="{ backgroundColor: player2BackgroundColor }">
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
      player1BackgroundColor: 'transparent', // Default background color for Player 1
      player2BackgroundColor: 'transparent', // Default background color for Player 2
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
      if (player === 1) {
        this.player1BackgroundColor = '#e74c3c'; // Red for Player 1
        this.player2BackgroundColor = 'transparent'; // Reset Player 2 color
      } else {
        this.player1BackgroundColor = 'transparent'; // Reset Player 1 color
        this.player2BackgroundColor = '#3498db'; // Blue for Player 2
      }

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
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

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
  /* Increase chip size */
  height: 60px;
  /* Increase chip size */
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: black;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
}

.grid-item div {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.player-selection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 20px;
  background-color: #2c3e509c;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  /* Futuristic shadow */
}

.player-selection p {
  color: #fff;
  font-size: 16px;
  margin-bottom: 20px;
}

label {
  position: relative;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  margin-bottom: 15px;
  padding: 10px 20px;
  border-color: rgba(10, 139, 135, 0.358);
  border-style: solid;
  border-width: 1.5px;
  /* Default border color */
  border-radius: 10px;
}

input[type="radio"] {
  display: none;
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
  transition: background-color 0.3s ease;
  /* Smooth hover transition */
}

button:hover {
  background-color: #27ae60;
  /* Darker green on hover */
}
</style>
