<template>
    <div>
        <HeaderPublic />
        <CvContent id="#main-content">
            <Nuxt />
            <FooterPublic />
        </CvContent>
    </div>
</template>

<style lang="scss">
@import '@/assets/scss/carbon';
@import '@/assets/scss/carbon-utils';

.bx--content {
    background-color: $ui-02;
}
</style>
