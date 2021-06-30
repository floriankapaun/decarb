<template>
    <MinimalForm :title="$t('p.dashboard.pageviewEstimation.h1')">
        <template #text>
            {{ $t('p.dashboard.pageviewEstimation.text') }}
        </template>

        <template #form>
            <Form
                ref="form"
                class="mb-md"
                :button-label="submitButtonLabel"
                :button-disbaled="getIsLoading"
                :inputs="inputs"
                :light="true"
                @submit="handleSubmit"
            />
        </template>
    </MinimalForm>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { estimatedMonthlyPageViews } from '@/config/public/inputs'
import Notification from '@/utils/Notification'

export default {
    name: 'DashboardPageviewEstimation',
    layout: 'minimal',
    nuxtI18n: {
        paths: {
            en: '/dashboard/pageview-estimation',
        },
    },
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
        submitButtonLabel() {
            if (this.getIsLoading) {
                return this.$t('p.users.id.verifyEmail.submitButtonLoading')
            }
            return this.$t('p.users.id.verifyEmail.submitButton')
        },
    },
    methods: {
        ...mapActions({
            addNotification: 'notifications/addNotification',
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
