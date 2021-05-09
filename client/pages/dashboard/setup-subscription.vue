<template>
    <section class="bx--row">
        <div
            class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-6 bx--col-xlg-4 mb-07"
        >
            <h1>Setup your offsetting subscription</h1>
            <CvForm>
                <legend class="bx--label">Payment Interval</legend>
                <CvRadioGroup :vertical="false" @change="actionChange">
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
                <p>
                    The length of each billing period.
                    {{
                        paymentInterval === $config.ENUMS.paymentInterval[1]
                            ? 'For websites with more than 10.000 pageviews per month we recommend to pay monthly.'
                            : null
                    }}
                </p>
            </CvForm>
            <p>This will cost ${{ price }} per month.</p>
            <p>
                Text about what this all means and some explanation about terms
                of ending your subscription and such stuff.
            </p>
            <CvButton @click="handleSubmit">Create Subscription</CvButton>
            <p>
                When clicking on this button you accept our
                <NuxtLink to="/terms">terms and conditions</NuxtLink>.
            </p>
        </div>
        <script src="https://js.stripe.com/v3/"></script>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: 'minimal',
    middlewares: ['auth'],
    data() {
        return {
            stripe: undefined,
            paymentInterval: this.$config.ENUMS.paymentInterval[0],
        }
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
        ...mapGetters({}),
        selectedDomain() {
            return this.getSelectedDomain
        },
        price() {
            // TODO: Implement price calculation
            return (12.4).toFixed(2)
        },
        priceId() {
            return this.$config.STRIPE_PRICE_ID[this.paymentInterval]
        },
    },
    methods: {
        ...mapActions({
            createCheckoutSession: 'subscriptions/createCheckoutSession',
        }),
        actionChange() {
            console.log('change', this.paymentInterval)
        },
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
            const stripe = this.initStripe()
            if (!stripe) return console.warn('Stripe setup failed')
            // Create Checkout Session
            await this.createCheckoutSession(this.priceId)
        },
        // 1. Init Stripe
        // 2. Create Checkout Session
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