<template>
    <div>
        <Hero
            level="1"
            :title="$t('p.members.hero.h')"
            :subtitle="$t('p.members.hero.p')"
        />

        <section class="bx--grid list">
            <div class="bx--row">
                <div class="bx--col-sm-4">
                    <h2>{{ $t('p.members.list.h') }}</h2>
                </div>
            </div>

            <div class="bx--row">
                <div class="bx--col-sm-4">
                    <CvDataTableSkeleton
                        v-if="getIsLoading"
                        :rows="2"
                    ></CvDataTableSkeleton>
                    <CvDataTable
                        v-else
                        :auto-width="false"
                        :pagination="false"
                        :sortable="false"
                        :zebra="false"
                        ><template slot="data">
                            <CvDataTableRow
                                v-for="domain in getDomains"
                                :key="domain.id"
                                :value="domain.id"
                            >
                                <CvDataTableCell
                                    ><CvLink
                                        :to="
                                            localeRoute({
                                                name: 'members-url',
                                                params: { url: domain.url },
                                            })
                                        "
                                        :inline="false"
                                        >{{ domain.url }}</CvLink
                                    ></CvDataTableCell
                                >
                                <CvDataTableCell>{{
                                    domain.companyName
                                }}</CvDataTableCell>
                            </CvDataTableRow>
                        </template></CvDataTable
                    >
                </div>
            </div>
        </section>

        <Hero
            level="2"
            :title="$t('p.members.cta.h')"
            :subtitle="$t('p.members.cta.p')"
            :button="$t('p.members.cta.button')"
            to="register"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Members',
    layout: 'default',
    nuxtI18n: {
        paths: {
            en: '/members',
        },
    },
    async fetch({ store }) {
        if (store.getters['domains/getDomains']) return
        await store.dispatch('domains/fetchDomains')
    },
    computed: {
        ...mapGetters({
            getDomains: 'domains/getDomains',
            getIsLoading: 'domains/getIsLoading',
        }),
    },
}
</script>

<style lang="scss" scoped>
.list {
    padding-top: $spacing-09;
    padding-bottom: $spacing-10;
    @include carbon--breakpoint(md) {
        padding-top: $spacing-11;
        padding-bottom: $spacing-12;
    }
}
</style>
