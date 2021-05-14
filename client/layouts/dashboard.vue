<template>
    <div>
        <HeaderDashboard />
        <CvContent id="#main-content" class="bx--grid dashboard">
            <NotificationsDashboard />
            <Nuxt keep-alive />
            <FooterMinimal />
        </CvContent>
    </div>
</template>

<script>
export default {
    middleware: ['auth'],
}
</script>

<style lang="scss" scoped>
.bx--content {
    background-color: $ui-02;
}

.dashboard {
    margin-left: 0;
}

// Add padding to body if left-panel is expanded
@media (min-width: 65.99rem) {
    .dashboard {
        padding-left: 18rem;
    }
}
</style>
