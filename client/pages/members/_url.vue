<template>
    <h1>{{ $route.params.url }}</h1>
</template>

<script>
export default {
    name: 'MemberPage',
    layout: 'default',
    nuxtI18n: {
        paths: {
            en: '/members/:url',
        },
    },
}
</script>
