<template>
    <MinimalForm :title="$t('p.dashboard.verifyDomainOwnership.h1')">
        <template #text>
            <span v-html="$t('p.dashboard.verifyDomainOwnership.p1')"></span>
        </template>

        <template #form>
            <TrackingCode :light="true" class="mb-sm" />
            <VerifyDomainOwnershipButton
                class="mb-md"
                @verified="handleVerified"
            />
        </template>
    </MinimalForm>
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
    async fetch({ store }) {
        // Make sure the current User with its newly registered Domain is fetched for auth reasons
        await store.dispatch('auth/fetchUser')
    },
    methods: {
        handleVerified() {
            this.$router.push({ path: `/dashboard/first-estimation` })
        },
    },
}
</script>
