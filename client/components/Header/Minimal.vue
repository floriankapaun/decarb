<template>
    <CvHeader :aria-label="$t('c.header.minimal.ariaLabel')">
        <CvSkipToContent href="#main-content">
            {{ $t('c.header.minimal.skipToContent') }}
        </CvSkipToContent>
        <CvHeaderName :to="localeRoute('index')">
            <Logo />
        </CvHeaderName>
    </CvHeader>
</template>

<style lang="scss" scoped>
.bx--header {
    background-color: $green;
    border-bottom: 1px solid $green;
    justify-content: center;

    &__name {
        padding-left: $spacing-05;
        padding-right: $spacing-05;

        svg {
            fill: $paper;
            max-height: $spacing-07;
        }
    }
}
</style>
