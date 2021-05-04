<template>
    <CvHeader aria-label="Eco Web Dashboard header">
        <CvHeaderMenuButton
            aria-label="Header navigation"
            aria-controls="side-nav-left"
        />
        <CvSkipToContent href="#main-content">Skip to content</CvSkipToContent>
        <CvHeaderName href="/"><Logo /></CvHeaderName>
        <NavigationDashboard />
        <template slot="header-global">
            <NavigationDashboardActions />
        </template>
        <template slot="left-panels">
            <CvSideNav id="side-nav-left" rail>
                <NavigationDashboardLeftPanel />
            </CvSideNav>
        </template>
    </CvHeader>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/carbon-utils';

.bx--header {
    background-color: #004335;
    border-bottom: 1px solid #016752;

    &__name {
        svg {
            fill: white;
            max-height: $spacing-07;
        }
    }
}

.bx--header__nav::before {
    background-color: #016752;
}
</style>
