<template>
    <section>
        <CvDataTable
            :title="$t('c.viewsPerPage.title')"
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
                this.$t('c.viewsPerPage.columns.url'),
                this.$t('c.viewsPerPage.columns.pageViews'),
            ],
        }
    },
    async fetch() {
        const store = this.$store
        if (store.getters['traffic/getViewsPerPage']) return

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

        // Create start and end date for statistics
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

        // Fetch statistical data
        if (!store.getters['traffic/getViewsPerPage']) {
            await store.dispatch('traffic/fetchViewsPerPage', {
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
            getViewsPerPage: 'traffic/getViewsPerPage',
        }),
        computedRows() {
            return this.getViewsPerPage?.map((x) => [x.url, x.pageViews])
        },
    },
}
</script>
