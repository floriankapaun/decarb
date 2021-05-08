<template>
    <section class="bx--row">
        <div class="bx--col-lg-16">
            <h1>Traffic</h1>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: 'dashboard',
    computed: {
        ...mapGetters({
            getUser: 'auth/getUser',
            getSelectedDomain: 'domains/getSelectedDomain',
        }),
    },
    async mounted() {
        await this.fetchUserDomains(this.getUser.id)
    },
    methods: {
        ...mapActions({}),
    },
}
</script>
