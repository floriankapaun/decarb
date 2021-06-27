<template>
    <section>
        <div class="bx--row">
            <div class="bx--col-sm-4 p-mb">
                <h1>{{ $t('p.dashboard.emissions.h1') }}</h1>
                <InsightEmissionsAggregation />
            </div>
        </div>
        {{ hostingEmissions }}
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'DashboardEmissions',
    layout: 'dashboard',
    nuxtI18n: {
        paths: {
            en: '/dashboard/emissions',
        },
    },
    async fetch({ store }) {
        if (store.getters['emissions/getHostingEmissions']) return

        // Make sure that selectedDomain exists
        if (!store.getters['domains/getSelectedDomain']) {
            if (!store.getters['auth/getUser']) {
                await store.dispatch('auth/fetchUser')
            }
            await store.dispatch(
                'domains/fetchUserDomains',
                store.getters['auth/getUser'].id
            )
        }

        // Fetch statistical data
        if (!store.getters['emissions/getHostingEmissions']) {
            await store.dispatch(
                'emissions/fetchHostingEmissions',
                store.getters['domains/getSelectedDomain'].id
            )
        }
    },
    computed: {
        ...mapGetters({
            getHostingEmissions: 'emissions/getHostingEmissions',
        }),
        hostingEmissions() {
            return this.getHostingEmissions
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
