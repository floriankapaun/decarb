<template>
    <div>
        <HeaderDashboard />
        <CvContent id="#main-content" class="bx--grid dashboard">
            <Nuxt />
            <FooterMinimal />
        </CvContent>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/carbon-utils';

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
