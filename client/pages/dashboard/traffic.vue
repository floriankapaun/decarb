<template>
    <section>
        <div class="bx--row">
            <div class="bx--col-sm-4">
                <h1 class="mb-sm">{{ $t('p.dashboard.traffic.h1') }}</h1>
            </div>
        </div>
        <div class="bx--row mb-md">
            <div
                class="
                    bx--col-sm-4 bx--col-md-8 bx--col-lg-16 bx--col-xlg-12
                    mb
                "
            >
                <CvTile class="extra-padding">
                    <h2 class="h2">
                        {{ $t('p.dashboard.traffic.viewsPerPage') }}
                    </h2>
                    <InsightViewsPerDay />
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
.h2 {
    margin-bottom: $spacing-06;
    @include decarb--type-style('productive-heading-03');
}

.extra-padding {
    @include carbon--breakpoint(md) {
        padding: $spacing-05 $spacing-07 $spacing-06 $spacing-06;
    }
}
</style>
