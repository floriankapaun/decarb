<template>
    <div>
        <h1>Setup your first domain</h1>
        <form name="register-domain" @submit.prevent="handleSubmit">
            <label for="siteUrl">Site URL</label>
            <input
                id="siteUrl"
                v-model="siteUrl"
                type="text"
                placeholder="e.g. www.sitedomain.com"
                required
            />
            <p>
                Enter a valid URL or IP address. You can add more sites later.
            </p>
            <label for="averageMonthlyPageViews">
                Average monthly Pageviews
            </label>
            <input
                id="averageMonthlyPageViews"
                v-model="averageMonthlyPageViews"
                type="number"
                placeholder="e.g. 13000"
                required
            />
            <p>This number is used for an initial cost estimation.</p>
            <button type="submit" :disabled="getIsLoading">
                {{ getIsLoading ? 'Loading...' : 'Start using Eco-Web' }}
            </button>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: 'minimal',
    middleware: ['auth'],
    data() {
        return {
            siteUrl: undefined,
            averageMonthlyPageViews: undefined,
        }
    },
    computed: {
        ...mapGetters({
            getAccessTokenExpiry: 'auth/getAccessTokenExpiry',
            getIsLoading: 'domains/getIsLoading',
            getSelectedDomain: 'domains/getSelectedDomain',
            getUser: 'auth/getUser',
            getUserDomains: 'domains/getUserDomains',
        }),
    },
    methods: {
        ...mapActions({
            fetchUserDomains: 'domains/fetchUserDomains',
            registerDomain: 'domains/register',
            setSelectedDomain: 'domains/setSelectedDomain',
        }),
        async handleSubmit() {
            if (this.getAccessTokenExpiry <= new Date()) {
                console.log('access token expired')
                return false
            }
            const pageViews = parseInt(this.averageMonthlyPageViews)
            await this.registerDomain({
                url: this.siteUrl,
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
                    x.searchIndex = x.url.search(this.siteUrl)
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
            await this.setSelectedDomain(registeredDomain)
            if (this.getSelectedDomain) {
                this.$router.push({
                    path: `/dashboard/verify-domain-ownership`,
                })
            }
            // OPTIMIZE: Maybe apply some error styling
        },
    },
}
</script>
