<template>
    <section class="wrapper">
        <div class="bx--grid">
            <Component :is="`h${level}`" class="title">{{ title }}</Component>
            <p class="subtitle">{{ subtitle }}</p>
            <p v-if="button && to" class="button">
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
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding: $spacing-09 0 $spacing-10;
    background-color: $primary;
    color: $white;

    @include carbon--breakpoint(md) {
        padding: $spacing-11 0 $spacing-12;
    }
}

.title {
    margin-bottom: 0;
    @include decarb--type-style('display-04');
}

.subtitle {
    margin-top: $spacing-06;
    @include decarb--type-style('expressive-heading-03');
}

.button {
    margin-top: $spacing-07;
}
</style>
