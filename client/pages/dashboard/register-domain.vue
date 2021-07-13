<template>
    <MinimalForm
        :title="$tc('p.dashboard.registerDomain.h1', numberOfRegisteredDomains)"
    >
        <template #text>
            {{ $t('p.dashboard.registerDomain.p') }}
        </template>

        <template #form>
            <Form
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

import { siteUrl, estimatedMonthlyPageViews } from '@/config/public/inputs'

export default {
    name: 'DashboardRegisterDomain',
    layout: 'minimal',
    nuxtI18n: {
        paths: {
            en: '/dashboard/register-domain',
        },
    },
    middleware: ['auth'],
    data() {
        return {
            inputs: [siteUrl, estimatedMonthlyPageViews],
        }
    },
    async fetch({ store }) {
        if (store.getters['domains/getUserDomains']) return
        if (!store.getters['auth/getUser']) {
            await store.dispatch('auth/fetchUser')
        }
        await store.dispatch(
            'domains/fetchUserDomains',
            store.getters['auth/getUser'].id
        )
    },
    computed: {
        ...mapGetters({
            getAccessTokenExpiry: 'auth/getAccessTokenExpiry',
            getIsLoading: 'domains/getIsLoading',
            getSelectedDomain: 'domains/getSelectedDomain',
            getUser: 'auth/getUser',
            getUserDomains: 'domains/getUserDomains',
        }),
        numberOfRegisteredDomains() {
            if (!this?.getUserDomains?.length) return 0
            return this.getUserDomains.length
        },
        submitButtonLabel() {
            if (this.getIsLoading) {
                return this.$t('p.dashboard.registerDomain.submitButtonLoading')
            }
            return this.$t('p.dashboard.registerDomain.submitButton')
        },
    },
    methods: {
        ...mapActions({
            fetchUserDomains: 'domains/fetchUserDomains',
            registerDomain: 'domains/register',
            setSelectedDomain: 'domains/setSelectedDomain',
        }),
        async handleSubmit(eventData) {
            const { siteUrl, estimatedMonthlyPageViews } = eventData
            const pageViews = parseInt(estimatedMonthlyPageViews)
            await this.registerDomain({
                url: siteUrl,
                estimatedMonthlyPageViews: pageViews,
            })
            await this.fetchUserDomains(this.getUser.id)
            // If there are no user Domains, the API should've returned an
            // Error which gets displayed as a Notification
            if (!this.getUserDomains) return false
            // Find registered domain in userDomains by siteUrl
            const sortedDomains = this.getUserDomains
                .map((x) => {
                    // Add searchIndex property to later sort by
                    x.searchIndex = x.url.search(siteUrl)
                    return x
                })
                .sort((a, b) => {
                    // Handles subdomains and partial fits
                    if (a.searchIndex < 0) return 1
                    if (b.searchIndex < 0) return -1
                    return a.searchIndex - b.searchIndex
                })
            const registeredDomain = sortedDomains[0]
            // Remove the unnecessary searchIndex property before dispatching an action
            delete registeredDomain.searchIndex
            // Set registeredDomain as selectedDomain
            await this.setSelectedDomain(registeredDomain)
            if (this.getSelectedDomain) {
                this.$router.push(
                    this.localeRoute(`/dashboard/verify-domain-ownership`)
                )
            }
        },
    },
}
</script>
