<template>
  <div class="player-selection">
    <p>Select your color:</p>
    <label :style="{ backgroundColor: player1OptionColor, borderColor: player1BorderColor }">
      <input type="radio" @click="changeCurrentPlayer(1)" name="playerSelection" />
      <span :class="{ 'selected-label': selectedPlayer === 1 }">Player 1 (Red)</span>
    </label>
    <label :style="{ backgroundColor: player2OptionColor, borderColor: player2BorderColor }">
      <input type="radio" @click="changeCurrentPlayer(2)" name="playerSelection" />
      <span :class="{ 'selected-label': selectedPlayer === 2 }">Player 2 (Blue)</span>
    </label>
    <button @click="confirmPlayer">Confirm Selection</button>

    <div v-if="showToast">
      <notification-toast :message="toastMessage" :type="type" :key="toastKey" />
    </div>
  </div>
</template>

<script>
import NotificationToast from '@/components/NotificationToast.vue'; // Adjust the path accordingly

export default {
  components: {
    NotificationToast,
  },
  data() {
    return {
      toastKey: 0,
      type: 'error',
      showToast: false,
      toastMessage: '',
      selectedPlayer: null,
      player1OptionColor: '#e74c3c',
      player2OptionColor: '#3498db',
      player1BorderColor: 'rgba(10, 139, 135, 0.358)',
      player2BorderColor: 'rgba(10, 139, 135, 0.358)',
    };
  },
  methods: {
    changeCurrentPlayer(player) {
      this.selectedPlayer = player;
      this.updateBorderColors();
    },
    confirmPlayer() {
      if (this.selectedPlayer) {
        this.$emit('confirm-player', { selectedPlayer: this.selectedPlayer });
      } else {
        this.showToast = true;
        this.toastMessage = "You need to select a player!"
        this.toastKey += 1; // Incrementing the key to force re-render
      }
    },
    updateBorderColors() {
      this.player1BorderColor = this.selectedPlayer === 1 ? 'white' : 'rgba(10, 139, 135, 0.358)';
      this.player2BorderColor = this.selectedPlayer === 2 ? 'white' : 'rgba(10, 139, 135, 0.358)';
    },
  },
};
</script>

<style>
/* Add necessary styles */

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
  border-style: solid;
  border-width: 1.5px;
  /* Default border color */
  border-radius: 10px;
  transition: border-color 0.3s ease;
  /* Smooth border color transition */
}

label:hover {
  border-color: white;
}

input[type="radio"] {
  display: none;
}

span {
  display: inline-block;
  width: 100%;
}

.selected-label {
  font-weight: bold;
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
