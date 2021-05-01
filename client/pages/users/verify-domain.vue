<template>
    <div>
        <h1>Setup your first domain</h1>
        <p>
            Paste the Eco-Web code into the <code>&#60;head&#62;</code> of every
            page on your domain. And then verify your installation.
        </p>
        <button>Copy to clipboard</button>
        <pre><code>&#60;!-- Eco-Web Tracking Code --&#62;
&#60;script&#62;(function(e,c,o,w,e,b){e.ew=e.ew||function(){(e.ew.q=e.ew.q||[]).push(arguments)};...})(window,document,’https://eco-website.com/tracking.js’);&#60;/script&#62;</code></pre>
        <button type="submit" :disabled="getIsLoading">
            {{ getIsLoading ? 'Loading...' : 'Verify Installation' }}
        </button>
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
        }),
        async handleSubmit() {},
    },
}
</script>
