<template>
  <div>
    <h1 class="game-title">Connect Four Challenge</h1>
    <MainMenu v-if="!colorConfirmed" @confirm-player="confirmPlayer" />
    <GamePage v-else :player="currentPlayer" />
  </div>
</template>

<script>
import MainMenu from './components/menu/MainMenu.vue';
import GamePage from './components/pages/GamePage.vue';

export default {
  components: {
    MainMenu,
    GamePage,
  },
  data() {
    return {
      currentPlayer: null,
      colorConfirmed: false,
    };
  },
  methods: {
    confirmPlayer({ selectedPlayer }) {
      this.colorConfirmed = true;
      this.currentPlayer = selectedPlayer; // Set the current player
    },
  },
};
</script>

<style>
.game-title {
  font-family: 'Arial', sans-serif;
  color: #ecf0f1;
  /* Light grey suitable for dark background */
  text-align: center;
  margin: 20px 0;
  font-size: 36px;
  font-weight: bold;
}
</style>
