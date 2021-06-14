<template>
    <section class="bx--row">
        <div
            class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-5 bx--col-xlg-6 mb-07"
        >
            <h1>{{ $t('p.dashboard.verifyDomainOwnership.h1') }}</h1>
            <p>
                Copy the {{ $config.PROJECT_NAME }} tag and paste it into the
                <code>&lt;head&gt;</code> section of the HTML code. If you are
                using a website builder like Wordpress or Shopify, copy the tag
                and paste it into the appropriate custom HTML code field.
            </p>
        </div>
        <div
            class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-5 bx--col-xlg-6 mb-07"
        >
            <TrackingCode />
        </div>
        <div
            class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-6 bx--col-xlg-4"
        >
            <p class="mb-05">
                Make sure to verify if your implementation was successfull.
            </p>
            <VerifyDomainOwnershipButton @verified="handleVerified" />
        </div>
    </section>
</template>

<script>
export default {
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
