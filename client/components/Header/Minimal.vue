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
    // background-color: transparent;
    background-color: #0c6343;
    // border-bottom: 1px solid transparent;
    border-bottom: 1px solid #016752;
    justify-content: center;

    &__name {
        padding-left: $spacing-05;
        padding-right: $spacing-05;

        svg {
            // fill: #0c6343;
            fill: white;
            max-height: $spacing-07;
        }
    }
}
</style>
