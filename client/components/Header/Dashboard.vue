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
    background-color: $green;
    border-bottom: 1px solid $green;

    &__name {
        svg {
            fill: $paper;
            max-height: $spacing-07;
        }
    }
}

.bx--side-nav__navigation {
    background-color: $ui-01;
}

.bx--header__nav::before {
    background-color: $green-500;
}
</style>
