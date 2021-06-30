<template>
    <MinimalForm :title="$t('p.dashboard.firstEstimation.h1')">
        <template #helper>
            <CvSkeletonText
                v-if="!selectedDomain && !emissionAmount"
                :heading="false"
                :paragraph="true"
                :line-count="3"
                width="100%"
                class="mb-sm"
            >
            </CvSkeletonText>
            <p v-else class="mb-sm">
                According to our first estimate, your website generates ~
                {{ emissionAmount }} of CO2 every month if it receives
                {{ selectedDomain.estimatedMonthlyPageViews }} page views.
            </p>
            <p class="mb-md">
                <NuxtLink
                    :to="localeRoute('dashboard-setup-subscription')"
                    class="bx--btn bx--btn--primary"
                >
                    Start Offsetting
                </NuxtLink>
            </p>
            <p>
                <CvLink :to="localeRoute('dashboard-pageview-estimation')">
                    Adjust estimated monthly pageviews
                </CvLink>
            </p>
        </template>
    </MinimalForm>
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
