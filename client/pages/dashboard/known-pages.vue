<template>
    <section class="bx--row">
        <div class="bx--col-lg-16">
            <h1>{{ $t('p.dashboard.knownPages.h1') }}</h1>
            <!-- TODO: Sort Table -->
            <!-- TODO: Search in Table -->
            <CvDataTableSkeleton
                v-if="getIsLoading"
                :title="$t('p.dashboard.knownPages.title')"
                :helper-text="$t('p.dashboard.knownPages.helperText')"
                :columns="columns"
                :rows="3"
            ></CvDataTableSkeleton>
            <CvDataTable
                v-else
                :title="$t('p.dashboard.knownPages.title')"
                :helper-text="$t('p.dashboard.knownPages.helperText')"
                :auto-width="false"
                :columns="columns"
                :data="computedPages"
                :sortable="true"
                :zebra="false"
                :pagination="pagination"
                @pagination="actionOnPagination"
                @search="onSearch"
                @sort="onSort"
            ></CvDataTable>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'DashboardKnownPages',
    layout: 'dashboard',
    nuxtI18n: {
        paths: {
            en: '/dashboard/page-index',
        },
    },
    data() {
        return {
            columns: [
                this.$t('p.dashboard.knownPages.columns.url'),
                this.$t('p.dashboard.knownPages.columns.createdAt'),
            ],
            pageSizes: [10, 15, 20, 25],
            state: {
                pagination: undefined,
                sort: undefined,
                search: undefined,
            },
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
            if (!this?.getDomainPages?.pages) return []
            return this.getDomainPages.pages.map((x) => [
                x.url,
                new Date(x.createdAt),
            ])
        },
        pagination() {
            return {
                numberOfItems: this.pages.length ?? 0,
                pageSizes: this.pageSizes,
            }
        },
        computedPages() {
            const { search, sort, pagination } = this.state
            let computedPages = this.pages
            // Filter Array by Search Term
            if (search) {
                computedPages = computedPages.filter((x) => {
                    return x[0].includes(search)
                })
            }
            // Sort Array
            if (sort && sort.index && sort.order) {
                computedPages = this.sortPages(computedPages, sort)
            }
            // Paginate Array
            if (pagination) {
                computedPages = computedPages.slice(
                    pagination.start - 1,
                    pagination.start - 1 + pagination.length
                )
            } else {
                computedPages = computedPages.slice(0, this.pageSizes[0] - 1)
            }
            // Format Date
            computedPages = computedPages.map((x) => [
                x[0],
                this.$d(x[1], 'short'),
            ])
            return computedPages
        },
    },
    methods: {
        actionOnPagination(eventData) {
            return (this.state.pagination = eventData)
        },
        onSearch(eventData) {
            return (this.state.search = eventData)
        },
        onSort(eventData) {
            return (this.state.sort = eventData)
        },
        sortPages(pages, sort) {
            return pages.sort((a, b) => {
                a = a[parseInt(sort.index)]
                b = b[parseInt(sort.index)]
                if (typeof a === 'string') {
                    if (sort.order === 'ascending') {
                        return -1 * a.localeCompare(b)
                    } else if (sort.order === 'descending') {
                        return a.localeCompare(b)
                    }
                }
                if (a instanceof Date) {
                    if (sort.order === 'ascending') {
                        return b - a
                    } else if (sort.order === 'descending') {
                        return a - b
                    }
                }
                return 0
            })
        },
    },
}
</script>

<style lang="scss">
// Copied from Storybook Component because not implemented in current Package Version
// Reference: https://vue.carbondesignsystem.com/?path=/story/components-cvdatatable--default

.bx--toolbar-search-container-active {
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
    -webkit-transition: -webkit-box-flex 0.15s cubic-bezier(0.2, 0, 0.38, 0.9);
    transition: -webkit-box-flex 0.15s cubic-bezier(0.2, 0, 0.38, 0.9);
    transition: flex 0.15s cubic-bezier(0.2, 0, 0.38, 0.9);
    transition: flex 0.15s cubic-bezier(0.2, 0, 0.38, 0.9),
        -webkit-box-flex 0.15s cubic-bezier(0.2, 0, 0.38, 0.9),
        -ms-flex 0.15s cubic-bezier(0.2, 0, 0.38, 0.9);
    transition: flex 0.15s cubic-bezier(0.2, 0, 0.38, 0.9),
        -webkit-box-flex 0.15s cubic-bezier(0.2, 0, 0.38, 0.9),
        -ms-flex 0.15s cubic-bezier(0.2, 0, 0.38, 0.9);
}

.bx--toolbar-search-container-expandable .bx--search {
    position: static;
    height: 100%;

    .bx--search-magnifier {
        left: 0;
        width: 3rem;
        width: var(--cds-layout-04, 3rem);
        height: 3rem;
        height: var(--cds-layout-04, 3rem);
        padding: 1rem;
        padding: var(--cds-spacing-05, 1rem);
        cursor: pointer;
        -webkit-transition: background 0.11s cubic-bezier(0, 0, 0.38, 0.9);
        transition: background 0.11s cubic-bezier(0, 0, 0.38, 0.9);
        pointer-events: all;

        // FIXME: Color Variables aren't overwritten by Custom Theme because imported
        // directly from a source package
        &:focus {
            outline: 2px solid $interactive-01;
            outline: 2px solid var(--cds-focus, $interactive-01);
            outline-offset: -2px;
        }
    }

    .bx--search-input {
        height: 100%;
        background-color: transparent;
        border: none;
    }
}
</style>
