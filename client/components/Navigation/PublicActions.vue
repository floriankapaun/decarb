<template>
    <div>
        <CvHeaderNav v-if="!getIsLoggedIn" class="action-header">
            <CvHeaderMenuItem :to="localeRoute('login')">
                {{ $t('c.navigation.publicActions.login') }}
            </CvHeaderMenuItem>
            <CvHeaderMenuItem :to="localeRoute('register')">
                <CvTag
                    class="tag"
                    :label="$t('c.navigation.publicActions.register')"
                    kind="green"
                ></CvTag>
            </CvHeaderMenuItem>
        </CvHeaderNav>

        <CvHeaderGlobalAction
            v-if="getIsLoggedIn"
            :aria-label="
                $t('c.navigation.publicActions.ariaLabelDashboardAction')
            "
            @click="handleDashboardAction"
        >
            <DashboardReference20 />
        </CvHeaderGlobalAction>
        <CvHeaderGlobalAction
            v-if="getIsLoggedIn"
            :aria-label="$t('c.navigation.publicActions.ariaLabelLogoutAction')"
            @click="handleLogoutAction"
        >
            <Logout20 />
        </CvHeaderGlobalAction>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Logout20 from '@carbon/icons-vue/lib/logout/20'
import DashboardReference20 from '@carbon/icons-vue/lib/dashboard--reference/20'

export default {
    components: {
        Logout20,
        DashboardReference20,
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
        handleDashboardAction() {
            this.$router.push(this.localeRoute('dashboard'))
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
.tag {
    font-size: 0.8rem;
    margin-left: 0;
    margin-right: 0;
    padding: 0.375rem 0.75rem;
    background-color: $paper;
    color: $green;
    cursor: pointer;
}
</style>
