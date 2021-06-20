<template>
    <div>
        <HeaderMinimal />
        <CvContent id="#main-content" class="bx--grid">
            <NotificationsInline
                classes="
                    bx--col-sm-4
                    bx--offset-md-2
                    bx--col-md-4
                    bx--col-lg-8
                    bx--offset-xlg-6
                    bx--col-xlg-4
                "
            />
            <Nuxt keep-alive />
            <FooterMinimal />
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

<style lang="scss" scoped>
.bx--content {
    background-color: $ui-02;
    padding: 0;

    & > * {
        padding: $spacing-05;

        @include carbon--breakpoint(md) {
            padding: $spacing-07;
        }
    }
}
</style>
