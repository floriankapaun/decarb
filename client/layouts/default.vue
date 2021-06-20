<template>
    <div>
        <HeaderPublic />
        <CvContent id="#main-content" class="bx--grid">
            <Nuxt keep-alive />
            <FooterPublic />
        </CvContent>
    </div>
</template>

<script>
export default {
    head() {
        return this.$nuxtI18nHead({ addSeoAttributes: true })
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/index';

.bx--content {
    background-color: $ui-02;
}
</style>
