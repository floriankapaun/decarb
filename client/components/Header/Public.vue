<template>
    <CvHeader :aria-label="$t('c.header.public.ariaLabel')">
        <CvSkipToContent href="#main-content">
            {{ $t('c.header.public.skipToContent') }}
        </CvSkipToContent>
        <CvHeaderName :to="localeRoute('index')"><Logo /></CvHeaderName>
        <NavigationPublic />
        <template slot="header-global">
            <NavigationPublicActions />
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
