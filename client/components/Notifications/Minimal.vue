<template>
    <section>
        <CvToastNotification
            v-for="notification in notifications"
            :key="notification.createdAt"
            :kind="notification.type"
            :title="notification.title"
            :sub-title="notification.subTitle"
            :caption="notification.caption"
            :close-arial-label="notification.closeAriaLabel"
            :low-contrast="notification.lowContrast"
            @close="doClose(notification)"
        ></CvToastNotification>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            getNotifications: 'notifications/getMinimalNotifications',
        }),
        notifications() {
            return this.getNotifications
        },
    },
    methods: {
        ...mapActions({
            removeNotification: 'notifications/removeMinimalNotification',
        }),
        doClose(notification) {
            this.removeNotification(notification)
        },
    },
}
</script>

<style lang="scss" scoped>
section {
    position: fixed;
    top: 4rem;
    right: 1rem;
}

.bx--toast-notification {
    max-width: calc(100vw - 4rem);
    animation: fade-in 0.25s ease-out 0s forwards;
}

@keyframes fade-in {
    0% {
        opacity: 0;
        transform: translateY(100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
