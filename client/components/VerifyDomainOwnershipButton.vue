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
            const notification = new Notification({
                type: 'success',
                title: this.$t('c.verifyDomainOwnershipButton.success'),
                subTitle: this.getSelectedDomain.url,
            })
            this.addNotification(notification)
            this.$emit('verified')
        },
    },
}
</script>
