<template>
    <section>
        <div class="bx--row">
            <div class="bx--col-sm-4 mb-md">
                <h1>{{ $t('p.dashboard.trackingCode.h1') }}</h1>
                <p class="mb-05">{{ $t('p.dashboard.trackingCode.p1') }}</p>
                <p v-html="$t('p.dashboard.trackingCode.p2')"></p>
            </div>
        </div>
        <div class="bx--row">
            <div
                class="
                    bx--col-sm-4 bx--col-md-6 bx--col-lg-12 bx--col-xlg-8
                    mb-md
                "
            >
                <TrackingCode />
            </div>
        </div>
        <div class="bx--row">
            <div class="bx--col-sm-4">
                <p class="mb-06">
                    {{ $t('p.dashboard.trackingCode.p3') }}
                </p>
                <VerifyDomainOwnershipButton />
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'DashboardTrackingCode',
    layout: 'dashboard',
    nuxtI18n: {
        paths: {
            en: '/dashboard/tracking-code',
        },
    },
}
</script>

<style lang="scss" scoped>
.mb-05 {
    margin-bottom: $spacing-05;
}

.mb-06 {
    margin-bottom: $spacing-06;
}
</style>
