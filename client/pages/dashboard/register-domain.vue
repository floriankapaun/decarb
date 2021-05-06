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
            getIsLoading: 'domains/getIsLoading',
            getAccessTokenExpiry: 'auth/getAccessTokenExpiry',
        }),
    },
    methods: {
        ...mapActions({
            registerDomain: 'domains/register',
            // fetchUserDomains: 'domains/fetchUserDomains',
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
            // TODO: Implement this one
            // await this.fetchUserDomains()
            // TODO: Redirect to next page
            // if (this.getUserDomains) {
            //     const result = this.getUserDomains.find((x) => x.)
            // }

            // OPTIMIZE: Maybe apply some error styling
        },
    },
}
</script>
