<template>
    <div>
        <HeaderDashboard />
        <CvContent
            id="#main-content"
            class="bx--grid bx--grid--full-width dashboard"
        >
            <Nuxt />
            <FooterMinimal />
        </CvContent>
    </div>
</template>

<style lang="scss" scoped>
// Add padding to body if left-panel is expanded
@media (min-width: 65.99rem) {
    .dashboard {
        padding-left: 18rem;
    }
}
</style>
