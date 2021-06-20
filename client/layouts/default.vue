<template>
    <div>
        <HeaderPublic />
        <CvContent id="#main-content">
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
</style>

<style lang="scss" scoped>
.bx--content {
    background-color: $ui-02;
    padding: 0;
}
</style>
