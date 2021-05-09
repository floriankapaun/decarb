<template>
    <section class="bx--row">
        <div
            class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-6 bx--col-xlg-4 mb-07"
        >
            <h1>First estimation is ready!</h1>
            <!-- TODO: Display Skeletion during loading -->
            <p v-if="selectedDomain">
                Based on our first estimation your website emits ~
                {{ emission }} of CO2 each month if it gets
                {{ selectedDomain.estimatedMonthlyPageViews }} pageviews.
            </p>
            <p><CvLink to="#">Change Number of pageviews.</CvLink></p>
            <NuxtLink to="/dashboard/setup-subscription" class="btn">
                Start Offsetting
            </NuxtLink>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: 'minimal',
    middlewares: ['auth'],
    computed: {
        ...mapGetters({
            getAccessToken: 'auth/getAccessToken',
            getUser: 'auth/getUser',
            getSelectedDomain: 'domains/getSelectedDomain',
        }),
        selectedDomain() {
            console.log(this.getSelectedDomain)
            return this.getSelectedDomain
        },
        emission() {
            // TODO: Implement emission calculation
            return '7 tonnes'
        },
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
