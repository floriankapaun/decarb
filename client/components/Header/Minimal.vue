<template>
    <header class="minimal--header">
        <NuxtLink :to="destination" class="minimal--logo--link">
            <Logo class="minimal--logo" color="black" />
        </NuxtLink>
    </header>
</template>

<script>
export default {
    computed: {
        destination() {
            if (
                this.$route.fullPath === '/login' ||
                this.$route.fullPath === '/register'
            ) {
                return this.localeRoute('index')
            }
            return this.localeRoute('dashboard')
        },
    },
}
</script>

<style lang="scss" scoped>
.minimal {
    &--header {
        margin-bottom: $spacing-06;
    }

    &--logo {
        max-width: $spacing-07;
        height: auto !important;
        margin-left: $spacing-01;
    }
}
</style>
