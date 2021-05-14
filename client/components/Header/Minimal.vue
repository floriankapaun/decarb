<template>
    <CvHeader aria-label="Eco Web header">
        <CvSkipToContent href="#main-content">Skip to content</CvSkipToContent>
        <CvHeaderName to="/">
            <Logo />
        </CvHeaderName>
    </CvHeader>
</template>

<style lang="scss" scoped>
.bx--header {
    // background-color: transparent;
    background-color: #004335;
    // border-bottom: 1px solid transparent;
    border-bottom: 1px solid #016752;
    justify-content: center;

    &__name {
        padding-left: $spacing-05;
        padding-right: $spacing-05;

        svg {
            // fill: #004335;
            fill: white;
            max-height: $spacing-07;
        }
    }
}
</style>
