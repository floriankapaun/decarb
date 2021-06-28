<template>
    <section>
        <div class="bx--row">
            <div class="bx--col-sm-4 mb-md">
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
