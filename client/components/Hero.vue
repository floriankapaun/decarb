<template>
    <section class="hero--wrapper" :class="[`hero--wrapper--${type}`]">
        <div class="bx--grid">
            <Component :is="`h${level}`" class="hero--title">{{
                title
            }}</Component>
            <p v-if="subtitle" class="hero--subtitle">{{ subtitle }}</p>
            <p v-if="button && to" class="hero--button--wrapper">
                <NuxtLink
                    :to="localeRoute(to)"
                    class="bx--btn bx--btn--secondary"
                >
                    {{ button }}
                </NuxtLink>
            </p>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        level: {
            type: String,
            default: '2',
        },
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            default: undefined,
        },
        button: {
            type: String,
            default: undefined,
        },
        to: {
            type: String,
            default: undefined,
        },
        type: {
            type: String,
            default: 'primary',
            validator: (val) => {
                const options = ['primary', 'secondary', 'tertiary']
                const result = options.includes(val)
                if (!result) {
                    console.warn(
                        `Invalid option supplied to "Hero.type": "${val}".`
                    )
                }
                return result
            },
        },
    },
}
</script>

<style lang="scss" scoped>
.hero {
    &--wrapper {
        padding: $spacing-09 0 $spacing-10;

        &--primary {
            background-color: $primary;
            color: $paper;
        }

        &--secondary {
            background-color: $secondary;
            color: $paper;
        }

        &--tertiary {
            background-color: $paper;
            color: $ink;
        }

        @include carbon--breakpoint(md) {
            padding: $spacing-11 0 $spacing-12;
        }
    }

    &--title {
        margin-bottom: 0;
        @include decarb--type-style('display-04');
    }

    &--subtitle {
        margin-top: $spacing-06;
        @include decarb--type-style('expressive-heading-03');
    }

    &--button--wrapper {
        margin-top: $spacing-07;
    }
}
</style>
