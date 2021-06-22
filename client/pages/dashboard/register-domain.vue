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
                verification__wrapper
            "
        >
            <h1>
                {{
                    $tc(
                        'p.dashboard.registerDomain.h1',
                        numberOfRegisteredDomains
                    )
                }}
            </h1>
            <p class="mb-06">
                Enter a valid URL or IP address. You can add more sites later.
            </p>
            <!-- TODO: REFACTOR STRING LITERALS TO LANG SPECIFIC MODULE -->
            <Form
                :button-label="
                    getIsLoading ? 'Loading...' : 'Start using DECARB'
                "
                :button-disbaled="getIsLoading"
                :inputs="inputs"
                @submit="handleSubmit"
            />
        </div>
    </section>
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
            if (!this.getUserDomains || this.getUserDomains.length) return 0
            return this.getUserDomains.length
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
            if (!this.getUserDomains) {
                // TODO: Add Error Handling
                console.warn('Seems like domain registry failed')
                return false
            }
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
            // OPTIMIZE: Maybe apply some error styling
        },
    },
}
</script>
