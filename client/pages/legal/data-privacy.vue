<template>
    <section class="bx--row">
        <div
            class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-6 bx--col-xlg-4"
        >
            <h1>{{ $t('p.legal.dataPrivacy.h1') }}</h1>
        </div>
    </section>
</template>

<script>
export default {
    layout: 'default',
    nuxtI18n: {
        paths: {
            en: '/legal/data-privacy',
        },
    },
}
</script>
