<template>
    <CvHeader aria-label="Eco Web header">
        <CvSkipToContent href="#main-content">Skip to content</CvSkipToContent>
        <CvHeaderName to="/"><Logo /></CvHeaderName>
        <NavigationPublic />
        <template slot="header-global">
            <NavigationPublicActions />
        </template>
    </CvHeader>
</template>

<style lang="scss" scoped>
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
