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
.bx--content {
    background-color: $ui-02;
}
</style>
