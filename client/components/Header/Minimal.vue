<template>
    <CvHeader aria-label="Eco Web header">
        <CvSkipToContent href="#main-content">Skip to content</CvSkipToContent>
        <CvHeaderName href="javascript:void(0)">
            <Logo />
            Text
        </CvHeaderName>
    </CvHeader>
</template>

<script>
export default {
    name: 'Navigation',
}
</script>

<style lang="scss" scoped>
.bx--header {
    background-color: transparent;
    border-bottom: 1px solid transparent;

    &__name svg {
        fill: #004335;
        max-height: 3rem;
    }
}

// @import '@/assets/scss/carbon-utils';

// header {
//     text-align: center;

//     svg {
//         width: 100%;
//         max-width: $spacing-12;
//         height: auto;
//     }
// }
</style>
