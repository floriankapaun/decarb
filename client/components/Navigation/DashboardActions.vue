<template>
    <div>
        <CvHeaderNav v-if="!getIsLoggedIn" class="action-header">
            <CvHeaderMenuItem :to="localeRoute('/login')">
                Login
            </CvHeaderMenuItem>
            <CvHeaderMenuItem :to="localeRoute('/register')">
                <CvTag class="pointer" label="Register" kind="green"></CvTag>
            </CvHeaderMenuItem>
        </CvHeaderNav>

        <CvHeaderGlobalAction
            v-if="getIsLoggedIn"
            aria-label="User settings"
            @click="handleHomeAction"
        >
            <Home20 />
        </CvHeaderGlobalAction>
        <CvHeaderGlobalAction
            v-if="getIsLoggedIn"
            aria-label="Logout"
            @click="handleLogoutAction"
        >
            <Logout20 />
        </CvHeaderGlobalAction>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Logout20 from '@carbon/icons-vue/lib/logout/20'
import Home20 from '@carbon/icons-vue/lib/home/20'

export default {
    components: {
        Logout20,
        Home20,
    },
    computed: {
        ...mapGetters({
            getIsLoggedIn: 'auth/getIsLoggedIn',
        }),
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout',
        }),
        handleHomeAction() {
            this.$router.push('/')
        },
        async handleLogoutAction() {
            await this.logout()
            // Reload the page
            this.$router.go()
        },
    },
}
</script>

<style lang="scss" scoped>
.action-header::before {
    content: unset;
}
.pointer {
    cursor: pointer;
}
</style>
