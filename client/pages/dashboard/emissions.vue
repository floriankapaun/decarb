<template>
    <section>
        <div class="bx--row">
            <div class="bx--col-sm-4 p-mb">
                <h1>{{ $t('p.dashboard.emissions.h1') }}</h1>
                <InsightEmissionsAggregation />
                <InsightHostingEmissions />
                <InsightPageviewEmissions />
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'DashboardEmissions',
    layout: 'dashboard',
    nuxtI18n: {
        paths: {
            en: '/dashboard/emissions',
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
