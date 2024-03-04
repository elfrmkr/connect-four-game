<template>
  <div>
    <DarkModeToggle />
    <h1 class="game-title">Connect Four Challenge</h1>
    <MainMenu v-if="!colorConfirmed" @confirm-player="confirmPlayer" />
    <GamePage v-else :player="currentPlayer" />
  </div>
</template>

<script>
import MainMenu from './components/menu/MainMenu.vue';
import GamePage from './components/pages/GamePage.vue';
import DarkModeToggle from './components/DarkModeToggle.vue';

export default {
  components: {
    MainMenu,
    GamePage,
    DarkModeToggle
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
