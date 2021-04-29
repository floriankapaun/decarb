<template>
    <div>
        <HeaderPublic />
        <Navigation />
        <CvContent id="#main-content">
            <Logo />
            <Nuxt />
            <CvButton>Button</CvButton>
        </CvContent>
    </div>
</template>

<script>
import { CvContent, CvButton } from '@carbon/vue'

export default {
    components: {
        CvContent,
        CvButton,
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/carbon';
</style>
