<template>
    <section class="bx--row">
        <div :class="classes">
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
            ></CvInlineNotification>
        </div>
    </section>
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
