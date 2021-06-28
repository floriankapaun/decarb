<template>
    <InsightTile
        level="2"
        :title="$t('c.emissionAggregation.title')"
        :subtitle="$t('c.emissionAggregation.subtitle')"
        :info="'' + amount"
        :note="$t('c.emissionAggregation.unit')"
    />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    async fetch() {
        const store = this.$store
        if (store.getters['emissions/getAggregation']) return

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
                domainId: store.getters['domains/getSelectedDomain'].id,
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
        }),
        amount() {
            if (!this.getAggregation) return 0
            // Convert milligrams to kilograms
            return Math.round(this.getAggregation / 1000000)
        },
    },
}
</script>
