<template>
    <section class="bx--row">
        <div class="bx--col-lg-16">
            <h1>Overview</h1>
        </div>
        <div class="bx--col-lg-8 col--card">
            <Card headline="Achievements">
                <p>Wow ey!</p>
            </Card>
        </div>
        <div class="bx--col-lg-8 col--card">
            <Card headline="Pageviews">
                <p>Wow ey!</p>
            </Card>
        </div>
        <div class="bx--col-lg-8 col--card">
            <Card headline="Emission Development">
                <p>Wow ey!</p>
            </Card>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: 'dashboard',
    computed: {
        ...mapGetters({
            getAccessToken: 'auth/getAccessToken',
            getUser: 'auth/getUser',
            getSelectedDomain: 'domains/getSelectedDomain',
        }),
    },
    async mounted() {
        if (!this.getUser) {
            if (!this.getAccessToken) {
                // TODO: Remove that stuff...
                console.warn('No Access Token provided')
                return false
            }
            await this.fetchUser(this.getAccessToken)
        }
        if (!this.getSelectedDomain) {
            await this.fetchUserDomains(this.getUser.id)
        }
    },
    methods: {
        ...mapActions({
            fetchUser: 'auth/fetchUser',
            fetchUserDomains: 'domains/fetchUserDomains',
        }),
    },
}
</script>

<style lang="scss" scoped>
h1 {
    margin-bottom: $spacing-07;
}

.col--card {
    margin-bottom: $spacing-07;
}
</style>
