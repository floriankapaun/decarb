<template>
    <InsightTile
        level="2"
        :title="$t('c.hostingEmissions.title')"
        :subtitle="$t('c.hostingEmissions.subtitle')"
        :info="
            renewableEnergy
                ? $t('c.hostingEmissions.green')
                : $t('c.hostingEmissions.grey')
        "
        :info-color="renewableEnergy ? 'primary' : null"
        :note="{
            href: 'https://www.thegreenwebfoundation.org/',
            i18nPath: 'c.hostingEmissions.source',
            linkText: $t('c.hostingEmissions.url'),
        }"
    />
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
        renewableEnergy() {
            return this.getHostingEmissions?.renewableEnergy ?? false
        },
    },
}
</script>

<style lang="scss" scoped>
.text-green {
    color: $primary;
}
</style>
