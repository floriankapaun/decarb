<template>
    <section class="bx--row">
        <div
            class="
                bx--col-sm-4
                bx--offset-md-2
                bx--col-md-4
                bx--col-lg-8
                bx--offset-xlg-5
                bx--col-xlg-6
                mb-07
            "
        >
            <h1>{{ $t('p.dashboard.verifyDomainOwnership.h1') }}</h1>
            <p v-html="$t('p.dashboard.verifyDomainOwnership.p1')"></p>
        </div>
        <div
            class="
                bx--col-sm-4
                bx--offset-md-2
                bx--col-md-4
                bx--col-lg-8
                bx--offset-xlg-5
                bx--col-xlg-6
                mb-07
            "
        >
            <TrackingCode />
        </div>
        <div
            class="
                bx--col-sm-4
                bx--offset-md-2
                bx--col-md-4
                bx--col-lg-8
                bx--offset-xlg-5
                bx--col-xlg-6
            "
        >
            <VerifyDomainOwnershipButton @verified="handleVerified" />
        </div>
    </section>
</template>

<script>
export default {
    name: 'DashboardVerifyDomainOwnership',
    layout: 'minimal',
    nuxtI18n: {
        paths: {
            en: '/dashboard/verify-domain-ownership',
        },
    },
    middleware: ['auth'],
    methods: {
        handleVerified() {
            this.$router.push({ path: `/dashboard/first-estimation` })
        },
    },
}
</script>

<style lang="scss" scoped>
.mb-05 {
    margin-bottom: $spacing-05;
}

.mb-07 {
    margin-bottom: $spacing-07;
}
</style>
