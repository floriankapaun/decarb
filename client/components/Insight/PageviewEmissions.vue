<template>
    <section>
        <CvDataTable
            :title="$t('c.pageviewEmissions.title')"
            :auto-width="false"
            :columns="columns"
            :data="computedRows"
            :pagination="false"
            :sortable="false"
            :zebra="false"
        ></CvDataTable>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            columns: [
                this.$t('c.pageviewEmissions.columns.url'),
                this.$t('c.pageviewEmissions.columns.emissionMilligrams'),
            ],
        }
    },
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
        computedRows() {
            return this.getPageviewEmissions?.map((x) => [
                x.url,
                x.emissionMilligrams,
            ])
        },
    },
}
</script>
