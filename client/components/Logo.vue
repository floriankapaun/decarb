<template>
    <img :src="`/logo-${color}.svg`" class="logo" :alt="$t('c.logo.alt')" />
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: 'white',
            validator: (val) => {
                const options = ['white', 'black']
                const result = options.includes(val)
                if (!result) {
                    console.warn(
                        `Invalid option supplied to "Logo.color": "${val}".`
                    )
                }
                return result
            },
        },
    },
}
</script>

<style lang="scss" scoped>
.logo {
    display: block;
    width: auto;
    height: 100%;
    padding-top: $spacing-01;
    padding-bottom: $spacing-01;
}
</style>
