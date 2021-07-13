<template>
    <div v-if="notifications && notifications.length" :class="classes">
        <CvInlineNotification
            v-for="notification in notifications"
            :key="notification.createdAt"
            :kind="notification.type"
            :title="notification.title"
            :sub-title="notification.subTitle"
            :action-label="notification.actionLabel"
            :close-arial-label="notification.closeAriaLabel"
            :low-contrast="notification.lowContrast"
            class="notification"
            @close="doClose(notification)"
        ></CvInlineNotification>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        classes: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapGetters({
            getNotifications: 'notifications/getNotifications',
        }),
        notifications() {
            return this.getNotifications
        },
    },
    methods: {
        ...mapActions({
            removeNotification: 'notifications/removeNotification',
        }),
        doClose(notification) {
            this.removeNotification(notification)
        },
    },
}
</script>

<style lang="scss" scoped>
.notification {
    margin-top: 0;
    margin-bottom: 0;
}

.notification + .notification {
    margin-top: $spacing-05;
}
</style>
