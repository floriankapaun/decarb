<template>
    <section class="bx--row">
        <div class="bx--col-md-4 bx--col-lg-8 bx--col-max-6 mb-07">
            <h1>Now add Eco Web to your site</h1>
            <p>
                Copy the eco web tag and paste it into the
                <code>&lt;head&gt;</code> section of the HTML code. If you are
                using a website builder like Wordpress or Shopify, copy the tag
                and paste it into the appropriate custom HTML code field. This
                code must be present on every page.
            </p>
        </div>
        <div class="bx--col-lg-16 mb-07">
            <TrackingCode />
        </div>
        <div class="bx--col-md-4 bx--col-lg-8 bx--col-max-6">
            <p class="mb-05">
                Make sure to verify if your implementation was successfull.
            </p>
            <CvButton @click="handleVerifyImplementation">
                Verify Implementation
            </CvButton>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: 'dashboard',
    computed: {
        ...mapGetters({
            getSelectedDomain: 'domains/getSelectedDomain',
            getUser: 'auth/getUser',
            getUserDomains: 'domains/getUserDomains',
        }),
    },
    methods: {
        ...mapActions({
            fetchUserDomains: 'domains/fetchUserDomains',
            setSelectedDomain: 'domains/setSelectedDomain',
            verifyDomainOwnership: 'domains/verifyDomainOwnership',
        }),
        async handleVerifyImplementation() {
            if (!this.getSelectedDomain || !this.getSelectedDomain.id) {
                return false
            }
            await this.verifyDomainOwnership(this.getSelectedDomain.id)
            await this.fetchUserDomains(this.getUser.id)
            const verifiedDomain = this.getUserDomains.find((x) => {
                return x.id === this.getSelectedDomain.id
            })
            await this.setSelectedDomain(verifiedDomain)
            // TODO: Give success feedback
            console.log('successfully verified!')
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/carbon-utils';

.mb-05 {
    margin-bottom: $spacing-05;
}

.mb-07 {
    margin-bottom: $spacing-07;
}
</style>
