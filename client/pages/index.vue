<template>
    <div>
        <h1>{{ $t('p.index.h1') }}</h1>
        <p class="mb-06">{{ $t('p.index.p1') }}</p>
        <p>
            <NuxtLink
                :to="localeRoute(registerDomainLink)"
                class="bx--btn bx--btn--primary"
            >
                {{ $t('p.index.ctaButton') }}
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
            if (this.getIsLoggedIn) return 'dashboard/register-domain'
            return 'register'
        },
    },
}
</script>
