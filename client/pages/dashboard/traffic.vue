<template>
    <section class="bx--row">
        <div class="bx--col-lg-16">
            <h1>{{ $t('p.dashboard.traffic.h1') }}</h1>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'DashboardTraffic',
    layout: 'dashboard',
    nuxtI18n: {
        paths: {
            en: '/dashboard/traffic',
        },
    },
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
