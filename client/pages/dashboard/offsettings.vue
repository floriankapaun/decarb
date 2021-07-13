<template>
    <section>
        <div class="bx--row">
            <div class="bx--col-sm-4">
                <h1 class="mb-sm">{{ $t('p.dashboard.offsettings.h1') }}</h1>
            </div>
        </div>
        <div class="bx--row mb-md">
            <div
                class="bx--col-sm-4 bx--col-md-4 bx--col-lg-8 bx--col-xlg-8 mb"
            >
                <CvTile>
                    <InsightOffsetAggregation />
                </CvTile>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'DashboardOffsettings',
    layout: 'dashboard',
    nuxtI18n: {
        paths: {
            en: '/dashboard/offsettings',
        },
    },
}
</script>
