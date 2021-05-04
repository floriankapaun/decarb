<template>
    <div class="divider" :class="[`divider--${width}-width`]"></div>
</template>

<script>
export default {
    props: {
        width: {
            type: String,
            default: 'default',
            validator: (val) => {
                const options = ['default', 'full']
                const result = options.includes(val)
                if (!result) {
                    console.warn(
                        `Invalid option supplied to "Divider": "${val}".`
                    )
                }
                return result
            },
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/carbon-utils';

.divider {
    position: relative;
    display: block;
    margin-bottom: $spacing-07;

    &::after {
        content: '';
        position: absolute;
        bottom: -1 * $spacing-05;
        left: $spacing-05;
        width: calc(100% - (2 * #{$spacing-05}));
        height: 0.0625rem;
        background: $ui-03;
    }
}

.divider--full-width {
    &::after {
        left: 0;
        width: 100%;
    }
}
</style>
