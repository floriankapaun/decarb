<template>
    <div>
        <CvHeaderGlobalAction
            v-if="getIsLoggedIn"
            :aria-label="
                $t('c.navigation.dashboardActions.ariaLabelHomeAction')
            "
            @click="handleHomeAction"
        >
            <Home20 />
        </CvHeaderGlobalAction>
        <CvHeaderGlobalAction
            v-if="getIsLoggedIn"
            :aria-label="
                $t('c.navigation.dashboardActions.ariaLabelLogoutAction')
            "
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
            this.$router.push(this.localeRoute('index'))
        },
        async handleLogoutAction() {
            await this.logout()
            // Reload the page
            this.$router.go()
        },
    },
}
</script>
