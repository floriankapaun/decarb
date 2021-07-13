<template>
    <h1>{{ $t('p.about.h1') }}</h1>
</template>

<script>
export default {
    name: 'About',
    nuxtI18n: {
        paths: {
            en: '/about-us',
        },
    },
}
</script>
