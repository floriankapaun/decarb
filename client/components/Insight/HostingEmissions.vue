<template>
    <section>HostingEmissions {{ hostingEmissions }}</section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    async fetch() {
        const store = this.$store
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
