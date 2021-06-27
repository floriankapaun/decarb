<template>
    <CvButtonSkeleton v-if="isLoading"></CvButtonSkeleton>
    <CvButton v-else @click="handleVerifyImplementation">
        {{ buttonText }}
    </CvButton>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Notification from '@/utils/Notification'

export default {
    async fetch() {
        const store = this.$store
        if (store.getters['domains/getSelectedDomain']) return
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
            getIsLoading: 'domains/getIsLoading',
            getSelectedDomain: 'domains/getSelectedDomain',
            getUser: 'auth/getUser',
            getUserDomains: 'domains/getUserDomains',
        }),
        isDomainVerified() {
            if (this.getSelectedDomain && this.getSelectedDomain.verifiedAt) {
                return true
            }
            return false
        },
        buttonText() {
            if (this.isDomainVerified) {
                return this.$t('c.verifyDomainOwnershipButton.verify')
            }
            return this.$t('c.verifyDomainOwnershipButton.verifyInitial')
        },
        isLoading() {
            return this.getIsLoading
        },
    },
    methods: {
        ...mapActions({
            fetchUserDomains: 'domains/fetchUserDomains',
            setSelectedDomain: 'domains/setSelectedDomain',
            verifyDomainOwnership: 'domains/verifyDomainOwnership',
            addNotification: 'notifications/addNotification',
        }),
        async resetUserDomains() {
            await this.fetchUserDomains(this.getUser.id)
            const verifiedDomain = this.getUserDomains.find((x) => {
                return x.id === this.getSelectedDomain.id
            })
            await this.setSelectedDomain(verifiedDomain)
        },
        async handleVerifyImplementation() {
            if (!this.getSelectedDomain?.id) return false
            // Verify implementation
            await this.verifyDomainOwnership(this.getSelectedDomain.id)
            // Re-Fetch UserDomains
            await this.resetUserDomains()
            // Handle verification success (failures will create Notification automatically)
            if (this.getSelectedDomain.verifiedAt) {
                const notification = new Notification({
                    type: 'success',
                    title: this.$t('c.verifyDomainOwnershipButton.success'),
                    subTitle: this.getSelectedDomain.url,
                })
                this.addNotification(notification)
                this.$emit('verified')
            }
        },
    },
}
</script>
