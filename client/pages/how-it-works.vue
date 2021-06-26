<template>
    <Hero level="1" :title="$t('p.howItWorks.hero.h')" />
</template>

<script>
export default {
    name: 'HowItWorks',
    nuxtI18n: {
        paths: {
            en: '/how-it-works',
        },
    },
}
</script>
