<template>
    <section>
        <div class="bx--row">
            <div class="bx--col-sm-4 p-mb">
                <h1>{{ $t('p.dashboard.emissions.h1') }}</h1>
                {{ aggregation }}
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
        if (
            store.getters['emissions/getHostingEmissions'] &&
            store.getters['emissions/getAggregation']
        ) {
            return
        }

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

        const domainId = store.getters['domains/getSelectedDomain'].id

        // Fetch statistical data
        if (!store.getters['emissions/getHostingEmissions']) {
            await store.dispatch('emissions/fetchHostingEmissions', domainId)
        }
        if (!store.getters['emissions/getAggregation']) {
            // Create start and end date for aggregation
            const d = new Date()
            const year = d.getFullYear().toString().padStart(4, '0')
            const month = (d.getMonth() + 1).toString().padStart(2, '0')
            const previousMonth = month - 1
            const day = d.getDate().toString().padStart(2, '0')
            const hour = d.getHours().toString().padStart(2, '0')
            const minute = d.getMinutes().toString().padStart(2, '0')
            const second = d.getSeconds().toString().padStart(2, '0')

            const now = `${year}-${month}-${day} ${hour}:${minute}:${second}`
            const monthAgo = `${year}-${previousMonth}-${day} ${hour}:${minute}:${second}`

            await store.dispatch('emissions/fetchAggregation', {
                domainId,
                options: {
                    timeStart: monthAgo,
                    timeEnd: now,
                },
            })
        }
    },
    computed: {
        ...mapGetters({
            getAggregation: 'emissions/getAggregation',
            getHostingEmissions: 'emissions/getHostingEmissions',
        }),
        aggregation() {
            return this.getAggregation
        },
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
