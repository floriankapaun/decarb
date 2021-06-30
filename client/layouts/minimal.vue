<template>
    <main class="minimal--wrapper">
        <CvTile class="minimal--tile">
            <HeaderMinimal />
            <Nuxt keep-alive />
        </CvTile>
        <FooterMinimal class="minimal--footer" />
    </main>
</template>

<script>
export default {
    name: 'LayoutMinimal',
    head() {
        return this.$nuxtI18nHead({ addSeoAttributes: true })
    },
}
</script>

<style lang="scss" scoped>
.minimal {
    &--wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 50vh;
        @include carbon--breakpoint(md) {
            padding: $spacing-07;
        }
    }

    &--tile,
    &--footer {
        width: 100%;
        @include carbon--breakpoint(md) {
            max-width: 30rem;
            padding: $spacing-07;
        }
    }

    &--tile {
        padding-top: $spacing-07;
        padding-bottom: $spacing-07;
    }

    &--footer {
        padding: $spacing-05;
        @include carbon--breakpoint(md) {
            padding: $spacing-07;
        }
    }
}
</style>
