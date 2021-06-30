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
            return this.localeRoute('index')
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
