<template>
    <InsightTile
        level="2"
        :title="$t('c.offsetAggregation.title')"
        :subtitle="
            since
                ? $t('c.offsetAggregation.since', {
                      date: $d(new Date(since), 'short'),
                  })
                : $t('c.offsetAggregation.fallbackSince')
        "
        :info="amount"
        :note="$t('c.offsetAggregation.unit')"
    />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    async fetch() {
        const store = this.$store
        if (store.getters['offsettings/getAggregation']) return

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
        if (!store.getters['offsettings/getAggregation']) {
            await store.dispatch(
                'offsettings/fetchAggregation',
                store.getters['domains/getSelectedDomain'].id
            )
        }
    },
    computed: {
        ...mapGetters({
            getAggregation: 'offsettings/getAggregation',
        }),
        amount() {
            return this.getAggregation?._sum?.offsetKilograms ?? '0'
        },
        since() {
            return this.getAggregation?._min?.from
        },
    },
}
</script>
