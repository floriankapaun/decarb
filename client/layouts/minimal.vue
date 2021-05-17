<template>
    <div>
        <HeaderMinimal />
        <CvContent id="#main-content" class="bx--grid">
            <NotificationsInline
                class="notifications"
                classes="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-5 bx--col-xlg-6"
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
}

.notifications {
    margin-bottom: $spacing-06;
}
</style>
