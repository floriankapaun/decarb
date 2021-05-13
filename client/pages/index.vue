<template>
    <div>
        <h1>Get an ecofriendly website</h1>
        <p class="mb-06">
            Track and offset your websites carbon footprint. So you can make a
            big difference with little effort.
        </p>
        <p>
            <NuxtLink :to="registerDomainLink" class="bx--btn bx--btn--primary">
                Register your domain
            </NuxtLink>
        </p>
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
