<!-- GameResultModal.vue -->
<template>
    <div class="game-result-modal">
        <div class="modal-content">
            <h2 class="text">Game Over!</h2>
            <p class="text">{{ winMessage }}</p>
            <button @click="startNewGame">New Game</button>
        </div>
    </div>
</template>

<script>
import confetti from 'canvas-confetti';

export default {
    props: {
        player: {
            type: Number,
            default: null,
        },
        winMessage: {
            type: String,
            default: null,
        }
    },
    mounted() {
        confetti();
    },
    methods: {
        startNewGame() {
            // Emit an event to inform the parent component to start a new game
            this.$emit('new-game');
        },
    },
};
</script>

<style scoped>
.text {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 2.5;
    margin: 5px;
}
</style>