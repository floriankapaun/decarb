<template>
    <section class="bx--row">
        <div class="bx--col-lg-16">
            <h1>{{ $t('p.dashboard.payments.h1') }}</h1>
            <CvButton @click="startCustomerPortalSession">
                {{ $t('p.dashboard.payments.button') }}
            </CvButton>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'DashboardPayments',
    layout: 'dashboard',
    nuxtI18n: {
        paths: {
            en: '/dashboard/payments',
        },
    },
    computed: {
        ...mapGetters({
            getAccessToken: 'auth/getAccessToken',
            getPortalSessionUrl: 'subscriptions/getPortalSessionUrl',
            getSelectedDomain: 'domains/getSelectedDomain',
            getUser: 'auth/getUser',
        }),
        customerPortalLink() {
            return 'hello'
        },
    },
    methods: {
        ...mapActions({
            createPortalSession: 'subscriptions/createPortalSession',
            fetchUserDomains: 'domains/fetchUserDomains',
        }),
        async startCustomerPortalSession() {
            if (!this.getUser) await this.fetchUser(this.getAccessToken)
            if (!this.getSelectedDomain) {
                await this.fetchUserDomains(this.getUser.id)
            }
            await this.createPortalSession({
                domainId: this.getSelectedDomain.id,
            })
            if (!this.getPortalSessionUrl) {
                // CHECK: This should never happen
                return false
            }
            // Redirect User to Stripe Customer Portal Session
            window.location.href = this.getPortalSessionUrl
        },
    },
}
</script>
