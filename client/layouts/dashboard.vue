<template>
    <div>
        <HeaderDashboard />
        <CvContent id="#main-content" class="bx--grid dashboard">
            <NotificationsInline
                class="notifications"
                classes="bx--col-lg-16"
            />
            <Nuxt keep-alive />
            <FooterMinimal />
        </CvContent>
    </div>
</template>

<script>
export default {
    name: 'LayoutDashboard',
    middleware: ['auth'],
    head() {
        return this.$nuxtI18nHead({ addSeoAttributes: true })
    },
}
</script>

<style lang="scss" scoped>
.bx--content {
    background-color: $ui-02;
}

.dashboard {
    margin-left: 0;
}

.notifications {
    margin-bottom: $spacing-06;
}

// Add padding to body if left-panel is expanded
@media (min-width: 65.99rem) {
    .dashboard {
        padding-left: 18rem;
    }
}
</style>
