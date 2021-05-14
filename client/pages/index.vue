<template>
    <div>
        {{ $t('pages.home') }}
        <h1>Get an ecofriendly website</h1>
        <p class="mb-06">
            Track and offset your websites carbon footprint. So you can make a
            big difference with little effort.
        </p>
        <p>
            <CvLink :to="localePath('about')">About</CvLink>
            <NuxtLink :to="registerDomainLink" class="bx--btn bx--btn--primary">
                Register your domain
            </NuxtLink>
        </p>
        <h1>Lang navigation</h1>
        <nuxt-link :to="switchLocalePath('it')">Italian</nuxt-link>
        <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    layout: 'default',
    computed: {
        ...mapGetters({
            getIsLoggedIn: 'auth/getIsLoggedIn',
        }),
        registerDomainLink() {
            if (this.getIsLoggedIn) return '/dashboard/register-domain'
            return '/register'
        },
    },
}
</script>
