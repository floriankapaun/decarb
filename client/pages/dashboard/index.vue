<template>
    <section class="bx--row">
        <div class="bx--col-lg-16">
            <h1>{{ $t('p.dashboard.index.h1') }}</h1>
        </div>
        <div class="bx--col-lg-8 mb-md">
            <CvTile><InsightOffsetAggregation /></CvTile>
        </div>
        <div class="bx--col-lg-8">
            <CvTile class="extra-padding">
                <h2 class="mb-sm">
                    {{ $t('p.dashboard.traffic.viewsPerPage') }}
                </h2>
                <InsightViewsPerDay />
            </CvTile>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Dashboard',
    layout: 'dashboard',
    nuxtI18n: {
        paths: {
            en: '/dashboard',
        },
    },
    computed: {
        ...mapGetters({
            getAccessToken: 'auth/getAccessToken',
            getUser: 'auth/getUser',
            getSelectedDomain: 'domains/getSelectedDomain',
        }),
    },
    async mounted() {
        if (!this.getUser) {
            if (!this.getAccessToken) {
                // TODO: Remove that stuff...
                console.warn('No Access Token provided')
                return false
            }
            await this.fetchUser(this.getAccessToken)
        }
        if (!this.getSelectedDomain) {
            await this.fetchUserDomains(this.getUser.id)
        }
    },
    methods: {
        ...mapActions({
            fetchUser: 'auth/fetchUser',
            fetchUserDomains: 'domains/fetchUserDomains',
        }),
    },
}
</script>

<style lang="scss" scoped>
.extra-padding {
    @include carbon--breakpoint(md) {
        padding: $spacing-05 $spacing-07 $spacing-06 $spacing-06;
    }
}
</style>
