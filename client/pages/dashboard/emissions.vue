<template>
    <section>
        <div class="bx--row">
            <div class="bx--col-sm-4 mb-md">
                <h1>{{ $t('p.dashboard.emissions.h1') }}</h1>
            </div>
        </div>
        <div class="bx--row mb-md">
            <div
                class="bx--col-sm-4 bx--col-md-4 bx--col-lg-8 bx--col-xlg-8 mb"
            >
                <CvTile>
                    <InsightEmissionsAggregation />
                </CvTile>
            </div>

            <div
                class="bx--col-sm-4 bx--col-md-4 bx--col-lg-8 bx--col-xlg-8 mb"
            >
                <CvTile>
                    <InsightHostingEmissions />
                </CvTile>
            </div>
        </div>
        <div class="bx--row">
            <div
                class="
                    bx--col-sm-4 bx--col-md-8 bx--col-lg-16 bx--col-xlg-12
                    mb
                "
            >
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
