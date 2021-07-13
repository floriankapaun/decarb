<template>
    <CvHeader :aria-label="$t('c.header.public.ariaLabel')">
        <CvHeaderMenuButton
            :aria-label="$t('c.header.public.menuButtonAriaLabel')"
            aria-controls="side-nav-left"
        />
        <CvSkipToContent href="#main-content">
            {{ $t('c.header.public.skipToContent') }}
        </CvSkipToContent>
        <CvHeaderName :to="localeRoute('index')"><Logo /></CvHeaderName>
        <CvHeaderNav :aria-label="$t('c.navigation.public.ariaLabel')">
            <NavigationPublic />
        </CvHeaderNav>
        <template slot="header-global">
            <NavigationPublicActions />
        </template>
        <template slot="left-panels">
            <CvSideNav id="side-nav-left" fixed>
                <CvSideNavItems>
                    <CvHeaderSideNavItems>
                        <NavigationPublic />
                    </CvHeaderSideNavItems>
                </CvSideNavItems>
            </CvSideNav>
        </template>
    </CvHeader>
</template>

<style lang="scss" scoped>
.bx--header {
    background-color: $green;
    border-bottom: 1px solid $green;
}

.bx--header__nav::before {
    background-color: $green-500;
}
</style>
