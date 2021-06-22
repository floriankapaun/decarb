<template>
    <div>
        <Hero
            level="1"
            :title="$t('p.members.hero.h')"
            :subtitle="$t('p.members.hero.p')"
        />

        <section class="bx--grid list">
            <div class="bx--row">
                <h2>{{ $t('p.members.list.h') }}</h2>
            </div>
            <div class="bx--row">...</div>
        </section>

        <Hero
            level="2"
            :title="$t('p.members.cta.h')"
            :subtitle="$t('p.members.cta.p')"
            :button="$t('p.members.cta.button')"
            :to="localeRoute('register')"
        />
    </div>
</template>

<script>
export default {
    name: 'Members',
    layout: 'default',
    nuxtI18n: {
        paths: {
            en: '/members',
        },
    },
}
</script>
