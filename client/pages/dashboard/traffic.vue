<template>
    <section>
        <div class="bx--row">
            <div class="bx--col-sm-4 p-mb">
                <h1>{{ $t('p.dashboard.traffic.h1') }}</h1>
                <InsightViewsPerDay />
                <InsightViewsPerPage />
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'DashboardTraffic',
    layout: 'dashboard',
    nuxtI18n: {
        paths: {
            en: '/dashboard/traffic',
        },
    },
}
</script>

<style lang="scss" scoped>
.p-mb {
    margin-bottom: $spacing-06;
    @include carbon--breakpoint(md) {
        margin-bottom: $spacing-09;
    }
}
</style>
