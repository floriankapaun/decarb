<template>
    <MinimalForm :title="$t('p.dashboard.setupSubscription.h1')">
        <template v-if="price" #text>
            {{
                $t('p.dashboard.setupSubscription.text', {
                    price,
                    interval: intervalNoun,
                })
            }}
        </template>

        <template #form>
            <CvForm class="mb-sm">
                <legend class="bx--label">
                    {{ $t('p.dashboard.setupSubscription.legend') }}
                </legend>
                <CvRadioGroup class="mb-xs" :vertical="false">
                    <CvRadioButton
                        v-model="paymentInterval"
                        name="paymentInterval"
                        :label="$config.ENUMS.paymentInterval[0]"
                        :value="$config.ENUMS.paymentInterval[0]"
                        :hide-label="false"
                    />
                    <CvRadioButton
                        v-model="paymentInterval"
                        name="paymentInterval"
                        :label="$config.ENUMS.paymentInterval[1]"
                        :value="$config.ENUMS.paymentInterval[1]"
                        :hide-label="false"
                    />
                </CvRadioGroup>
                <p class="bx--label">
                    {{
                        paymentInterval === $config.ENUMS.paymentInterval[1]
                            ? $t('p.dashboard.setupSubscription.recommendation')
                            : null
                    }}
                </p>
            </CvForm>

            <CvButton class="mb-md" @click="handleSubmit"
                >Create Subscription</CvButton
            >
        </template>

        <template #helper>
            <p class="helper-text">
                {{ $t('p.dashboard.setupSubscription.legal') }}
            </p>
        </template>
    </MinimalForm>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'DashboardSetupSubscription',
    layout: 'minimal',
    nuxtI18n: {
        paths: {
            en: '/dashboard/setup-subscription',
        },
    },
    middleware: ['auth'],
    data() {
        return {
            stripe: undefined,
            paymentInterval: this.$config.ENUMS.paymentInterval[0],
        }
    },
    async fetch({ store }) {
        if (
            store.getters['domains/getSelectedDomain'] &&
            store.getters['domains/getEmissionEstimation'] &&
            store.getters['domains/getSelectedDomain']?.id ===
                store.getters['domains/getEmissionEstimation']?.id
        ) {
            return
        }
        if (!store.getters['domains/getSelectedDomain']) {
            if (!store.getters['auth/getUser']) {
                await store.dispatch('auth/fetchUser')
            }
            await store.dispatch(
                'domains/fetchUserDomains',
                store.getters['auth/getUser'].id
            )
        }
        await store.dispatch(
            'domains/fetchEmissionEstimation',
            store.getters['domains/getSelectedDomain'].id
        )
    },
    head() {
        return {
            script: [
                {
                    src: 'https://js.stripe.com/v3/',
                    async: true,
                    defer: true,
                },
            ],
        }
    },
    computed: {
        ...mapGetters({
            getAccessToken: 'auth/getAccessToken',
            getCheckoutSessionId: 'subscriptions/getCheckoutSessionId',
            getUser: 'auth/getUser',
            getSelectedDomain: 'domains/getSelectedDomain',
            getSubscription: 'subscriptions/getSubscription',
            getEmissionEstimation: 'domains/getEmissionEstimation',
        }),
        selectedDomain() {
            return this.getSelectedDomain
        },
        price() {
            const kg = this.getEmissionEstimation?.kilograms
            if (!kg) return null
            const monthlyCosts =
                (kg * this.$config.STRIPE_CENTS_PER_KG_CO2E) / 100
            if (
                this.paymentInterval === this.$config.ENUMS.paymentInterval[0]
            ) {
                return monthlyCosts.toFixed(2)
            }
            return (monthlyCosts * 12).toFixed(2)
        },
        priceId() {
            return this.$config.STRIPE_PRICE_ID[this.paymentInterval]
        },
        intervalNoun() {
            if (
                this.paymentInterval === this.$config.ENUMS.paymentInterval[0]
            ) {
                return this.$t('p.dashboard.setupSubscription.month')
            }
            return this.$t('p.dashboard.setupSubscription.year')
        },
    },
    methods: {
        ...mapActions({
            createCheckoutSession: 'subscriptions/createCheckoutSession',
            createSubscription: 'subscriptions/createSubscription',
            fetchUserDomains: 'domains/fetchUserDomains',
            fetchUser: 'auth/fetchUser',
        }),
        initStripe() {
            if (
                typeof window !== 'undefined' &&
                window.Stripe &&
                !this.stripe
            ) {
                // eslint-disable-next-line no-undef
                return (this.stripe = Stripe(this.$config.STRIPE_PUBLIC_KEY))
            }
            return false
        },
        async handleSubmit() {
            if (!this.getUser) await this.fetchUser(this.getAccessToken)
            if (!this.getSelectedDomain) {
                await this.fetchUserDomains(this.getUser.id)
            }
            await this.createSubscription({
                domainId: this.getSelectedDomain.id,
                paymentInterval: this.paymentInterval,
                offsetType: this.$config.ENUMS.offsetType[0],
                stripePriceId: this.priceId,
            })
            const subscriptionId = this.getSubscription.id
            if (!subscriptionId)
                console.warn('No subscription ID. This should never happen.')
            // FIXME: Doesn't make sense that way. Init should only be called once
            // Returning doesn't make sense either
            const stripe = this.initStripe()
            if (!stripe) return console.warn('Stripe setup failed')
            // Create Checkout Session
            await this.createCheckoutSession({
                email: this.getUser.email,
                priceId: this.priceId,
                subscriptionId,
                domainId: this.getSelectedDomain.id,
            })
            // Check if Checkout Session was created successfully
            if (!this.getCheckoutSessionId) {
                return console.warn(
                    'Failed Creating or Storing Checkout Session'
                )
            }
            // Redirect User to Stripe Checkout Session
            // TODO: This might fail --> Add Error Handling (actually to whole file)
            this.stripe.redirectToCheckout({
                sessionId: this.getCheckoutSessionId,
            })
        },
        // await fetch('/create-checkout-session', ...)
        // 2.5 Save generated Customer ID while processing the checkout.session.completed webhook.
        // 3. Redirect User to Checkout for that Session
        // stripe.redirectToCheckout({ sessionId: data.sessionId })
        // After the subscription signup succeeds, the customer returns to your website at the success_url, which initiates a checkout.session.completed event. When you receive a checkout.session.completed event, you can provision the subscription. Continue to provision each month (if billing monthly) as you receive invoice.paid events. If you receive an invoice.payment_failed event, notify your customer and send them to the customer portal to update their payment method.
        // 4. Create a Customer Portal Session
        // app.post('/customer-portal', ...
        // 5. Send customers to the portal
    },
}
</script>
