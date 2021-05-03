<template>
    <CvHeader aria-label="Eco Web header">
        <CvSkipToContent href="#main-content">Skip to content</CvSkipToContent>
        <!-- Negative Tab-Index, because there is no link -->
        <CvHeaderName href="javascript:void(0)" tabindex="-1">
            <Logo />
        </CvHeaderName>
    </CvHeader>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/carbon-utils';

.bx--header {
    // background-color: transparent;
    background-color: #004335;
    // border-bottom: 1px solid transparent;
    border-bottom: 1px solid #016752;
    justify-content: center;

    &__name {
        padding-left: 0;
        padding-right: 0;
        cursor: auto; // no pointer

        &:focus {
            border: none;
            border-color: transparent;
        }

        svg {
            // fill: #004335;
            fill: white;
            max-height: $spacing-07;
        }
    }
}
</style>
