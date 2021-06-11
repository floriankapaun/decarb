<template>
    <CvHeader :aria-label="$t('c.header.dashboard.ariaLabel')">
        <CvHeaderMenuButton
            :aria-label="$t('c.header.dashboard.menuButtonAriaLabel')"
            aria-controls="side-nav-left"
        />
        <CvSkipToContent href="#main-content">
            {{ $t('c.header.dashboard.skipToContent') }}
        </CvSkipToContent>
        <CvHeaderName :to="localeRoute('dashboard')"><Logo /></CvHeaderName>
        <template slot="header-global">
            <NavigationDashboardActions />
        </template>
        <template slot="left-panels">
            <CvSideNav id="side-nav-left">
                <NavigationDashboardLeftPanel />
            </CvSideNav>
        </template>
    </CvHeader>
</template>

<style lang="scss" scoped>
.bx--header {
    background-color: #0c6343;
    border-bottom: 1px solid #016752;

    &__name {
        svg {
            fill: white;
            max-height: $spacing-07;
        }
    }
}

.bx--side-nav__navigation {
    background-color: $ui-01;
}

.bx--header__nav::before {
    background-color: #016752;
}
</style>
