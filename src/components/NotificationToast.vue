<template>
    <div class="notification-toast" :class="[toastType, animationClass]">
        <div class="notification-content">
            {{ message }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'success',
            validator: (value) => ['success', 'error', 'info'].includes(value),
        },
    },
    data() {
        return {
            animationClass: 'slide-in',
        };
    },
    computed: {
        toastType() {
            return `toast-${this.type}`;
        },
    },
    mounted() {
        setTimeout(() => {
            this.hideToast();
        }, 3000);
    },
    methods: {
        hideToast() {
            this.animationClass = 'slide-out';
            setTimeout(() => {
                this.$emit('animationend');
            }, 500);
        },
    },
};
</script>

<style scoped>
.notification-toast {
    position: fixed;
    bottom: 10px;
    right: 10px;
    padding: 10px;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    opacity: 1;
    z-index: 9999;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.slide-in {
    transform: translateX(100%);
    animation: slide-in 0.5s ease-in-out forwards;
}

.slide-out {
    transform: translateX(100%);
    animation: slide-out 0.5s ease-in-out forwards;
}

.toast-success {
    background-color: #2ecc71;
    /* Greenish color for success */
}

.toast-error {
    background-color: #e74c3c;
    /* Red color for error */
}

.toast-info {
    background-color: #3498db;
    /* Blue color for info */
}

@keyframes slide-in {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
}

@keyframes slide-out {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(120%);
    }
}
</style>
