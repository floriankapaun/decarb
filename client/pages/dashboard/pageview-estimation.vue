<template>
    <section class="bx--row">
        <div
            class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-5 bx--col-xlg-6 mb-07"
        >
            <h1 class="heading">Adjust your estimated monthly pageviews</h1>
            <p class="mb-06">
                Keep in mind, page views are not the same as page visits. One
                visit can cause multiple page views. This number is used for our
                initial cost estimation.
            </p>
            <Form
                ref="form"
                :button-label="getIsLoading ? 'Loading...' : 'Submit'"
                :button-disbaled="getIsLoading"
                :inputs="inputs"
                @submit="handleSubmit"
            />
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { estimatedMonthlyPageViews } from '@/config/public/inputs'
import Notification from '@/utils/Notification'

export default {
    layout: 'minimal',
    middleware: ['auth'],
    data() {
        return {
            inputs: [estimatedMonthlyPageViews],
        }
    },
    computed: {
        ...mapGetters({
            getIsLoading: 'domains/getIsLoading',
            getUser: 'auth/getUser',
            getUserDomains: 'domains/getUserDomains',
            getSelectedDomain: 'domains/getSelectedDomain',
        }),
    },
    methods: {
        ...mapActions({
            addNotification: 'notifications/addMinimalNotification',
            fetchUserDomains: 'domains/fetchUserDomains',
            setSelectedDomain: 'domains/setSelectedDomain',
            updateDomain: 'domains/updateDomain',
        }),
        async handleSubmit(eventData) {
            const estimatedMonthlyPageViews = parseInt(
                eventData.estimatedMonthlyPageViews
            )
            if (!estimatedMonthlyPageViews) return false
            await this.updateDomain({
                domainId: this.getSelectedDomain.id,
                domainData: { estimatedMonthlyPageViews },
            })
            // Fetch User Domains again
            await this.fetchUserDomains(this.getUser.id)
            // Find the selected domain in the new fetched domains Array
            const updatedDomain = this.getUserDomains.find((x) => {
                return x.id === this.getSelectedDomain.id
            })
            // Set selectedDomain to updated domain
            await this.setSelectedDomain(updatedDomain)
            // TODO: Implement global notification
            const notification = new Notification({
                type: 'success',
                title: `Successfully updated ${this.getSelectedDomain.url}`,
                subTitle: `Estimated monthly pageviews: ${estimatedMonthlyPageViews}`,
            })
            this.addNotification(notification)
            if (
                this.getSelectedDomain.estimatedMonthlyPageViews ===
                estimatedMonthlyPageViews
            ) {
                return this.$router.push('/dashboard/first-estimation')
            }
            // OPTIMIZE: Maybe apply some error styling
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/carbon-utils';

.heading {
    margin-bottom: $spacing-06;
    @include carbon--type-style('expressive-heading-06');
}

.mb-06 {
    margin-bottom: $spacing-06;
}
</style>
