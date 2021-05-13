<template>
    <section>
        <CvInlineNotification
            v-for="notification in notifications"
            :key="notification.createdAt"
            :kind="notification.type"
            :title="notification.title"
            :sub-title="notification.subTitle"
            :action-label="notification.actionLabel"
            :close-arial-label="notification.closeAriaLabel"
            :low-contrast="notification.lowContrast"
            @close="doClose(notification)"
            @action="doAction"
        ></CvInlineNotification>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
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
        doAction() {
            // TODO: handle this case...
            console.log('do action')
        },
        doClose(notification) {
            this.removeNotification(notification)
        },
    },
}
</script>
