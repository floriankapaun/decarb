<template>
    <section class="bx--row">
        <div class="bx--col-md-4 bx--col-lg-8 bx--col-max-6 mb-07">
            <h1>{{ $t('p.dashboard.trackingCode.h1') }}</h1>
            <p>
                Copy the {{ $config.PROJECT_NAME }} tag and paste it into the
                <code>&lt;head&gt;</code> section of the HTML code. If you are
                using a website builder like Wordpress or Shopify, copy the tag
                and paste it into the appropriate custom HTML code field. This
                code must be present on every page.
            </p>
        </div>
        <div class="bx--col-lg-16 mb-07">
            <TrackingCode />
        </div>
        <div class="bx--col-md-4 bx--col-lg-8 bx--col-max-6">
            <p class="mb-05">
                Make sure to verify if your implementation was successfull.
            </p>
            <VerifyDomainOwnershipButton />
        </div>
    </section>
</template>

<script>
export default {
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

.mb-07 {
    margin-bottom: $spacing-07;
}
</style>
