<template>
    <section class="bx--row">
        <div
            class="
                bx--col-sm-4
                bx--offset-md-2
                bx--col-md-4
                bx--col-lg-8
                bx--offset-xlg-5
                bx--col-xlg-6
                mb-07
            "
        >
            <h1>{{ $t('p.dashboard.firstEstimation.h1') }}</h1>
            <CvSkeletonText
                v-if="!selectedDomain && !emissionAmount"
                :heading="false"
                :paragraph="true"
                :line-count="2"
                width="100%"
            >
            </CvSkeletonText>
            <p v-else class="mb-06">
                According to our first estimate, your website generates ~
                {{ emissionAmount }} of CO2 every month if it receives
                {{ selectedDomain.estimatedMonthlyPageViews }} page views.
            </p>
            <p class="mb-06">
                <CvLink :to="localeRoute('dashboard-pageview-estimation')">
                    Adjust estimated monthly pageviews
                </CvLink>
            </p>
            <p>
                <NuxtLink
                    :to="localeRoute('dashboard-setup-subscription')"
                    class="bx--btn bx--btn--primary"
                >
                    Start Offsetting
                </NuxtLink>
            </p>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'DashboardFirstEstimation',
    layout: 'minimal',
    nuxtI18n: {
        paths: {
            en: '/dashboard/first-estimation',
        },
    },
    middleware: ['auth'],
    computed: {
        ...mapGetters({
            getAccessToken: 'auth/getAccessToken',
            getUser: 'auth/getUser',
            getSelectedDomain: 'domains/getSelectedDomain',
        }),
        selectedDomain() {
            return this.getSelectedDomain
        },
        emissionAmount() {
            // TODO: Implement emission calculation
            console.log(this.getSelectedDomain)
            return '7 tonnes'
        },
    },
    async mounted() {
        if (!this.getUser) {
            await this.fetchUser()
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
