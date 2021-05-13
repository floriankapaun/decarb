<template>
    <div>
        <HeaderMinimal />
        <CvContent id="#main-content" class="bx--grid">
            <NotificationsMinimal />
            <Nuxt keep-alive />
            <FooterMinimal />
        </CvContent>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/carbon-utils';

.bx--content {
    background-color: $ui-02;
}
</style>
