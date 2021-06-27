<template>
    <section>PageviewEmissions {{ pageviewEmissions }}</section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    async fetch() {
        const store = this.$store
        if (store.getters['emissions/getPageviewEmissions']) return

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
        if (!store.getters['emissions/getPageviewEmissions']) {
            await store.dispatch('emissions/fetchPageviewEmissions', {
                domainId: store.getters['domains/getSelectedDomain'].id,
            })
        }
    },
    computed: {
        ...mapGetters({
            getPageviewEmissions: 'emissions/getPageviewEmissions',
        }),
        pageviewEmissions() {
            return this.getPageviewEmissions
        },
    },
}
</script>
