<template>
    <section class="bx--row">
        <div class="bx--col-lg-16">
            <h1>{{ $t('p.dashboard.pageIndex.h1') }}</h1>
            <CvDataTableSkeleton
                v-if="getIsLoading"
                :columns="columns"
                :rows="3"
            ></CvDataTableSkeleton>
            <CvDataTable
                v-else
                :auto-width="false"
                :columns="columns"
                :data="pages"
                :sortable="true"
                :zebra="false"
            ></CvDataTable>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    layout: 'dashboard',
    data() {
        return {
            columns: [
                this.$t('p.dashboard.pageIndex.columns.url'),
                this.$t('p.dashboard.pageIndex.columns.createdAt'),
            ],
        }
    },
    async fetch({ store }) {
        if (store.getters['domains/getDomainPages']) return
        if (!store.getters['domains/getSelectedDomain']) {
            if (!store.getters['auth/getUser']) {
                await store.dispatch('auth/fetchUser')
            }
            await store.dispatch(
                'domains/fetchUserDomains',
                store.getters['auth/getUser'].id
            )
        }
        await store.dispatch(
            'domains/fetchDomainPages',
            store.getters['domains/getSelectedDomain'].id
        )
    },
    computed: {
        ...mapGetters({
            getDomainPages: 'domains/getDomainPages',
            getIsLoading: 'domains/getIsLoading',
        }),
        pages() {
            if (!this.getDomainPages || !this.getDomainPages.pages) return []
            return this.getDomainPages.pages.map((x) => ({
                url: x.url,
                createdAt: this.$d(new Date(x.createdAt), 'short'),
            }))
        },
    },
}
</script>
