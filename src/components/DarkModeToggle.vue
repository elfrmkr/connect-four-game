<template>
    <div class="dark-mode-toggle" @click="toggleDarkMode">
        <span v-if="isDarkMode">🌙</span>
        <span v-else>☼</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isDarkMode: true,
        };
    },
    created() {
        this.applyDarkMode(); // Apply dark mode when the component is created
    },
    methods: {
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
            this.applyDarkMode();
        },
        applyDarkMode() {
            document.documentElement.classList.toggle('dark-mode', this.isDarkMode);
        },
    },
};
</script>

<style scoped>
/* Add necessary styles for the dark mode toggle */
.dark-mode-toggle {
    cursor: pointer;
    font-size: 24px;
    top: 1%;
    right: 1%;
    position: fixed;
}
</style>
