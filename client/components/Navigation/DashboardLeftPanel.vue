<template>
    <CvSideNavItems v-if="getSelectedDomain">
        <CvSideNavMenu :title="getSelectedDomain.url">
            <template slot="nav-icon">
                <!-- Include: Domains Favicon if possible -->
                <div v-show="faviconLoaded" class="favicon--wrapper">
                    <img
                        :src="`https://${getSelectedDomain.url}/favicon.ico`"
                        :alt="
                            $t('c.navigation.dashboardLeftPanel.faviconAlt', {
                                url: getSelectedDomain.url,
                            })
                        "
                        class="favicon"
                        @load="onFaviconLoad"
                    />
                </div>
                <!-- Have to use v-if because v-show is not working on component -->
                <Http16 v-if="!faviconLoaded" />
            </template>
            <CvSideNavMenuItem
                v-for="domain in getOtherUserDomains"
                :key="domain.id"
                href="javascript:void(0)"
                @click="handleSelectDomain(domain)"
            >
                {{ domain.url }}
            </CvSideNavMenuItem>
            <CvSideNavMenuItem
                :to="localeRoute('dashboard-register-domain')"
                class="icon-positioning--add"
            >
                <Add16 /> {{ $t('c.navigation.dashboardLeftPanel.addDomain') }}
            </CvSideNavMenuItem>
        </CvSideNavMenu>

        <Divider />

        <CvSideNavLink :to="localeRoute('dashboard-offsettings')">
            <template slot="nav-icon"><Sprout16 /></template>
            {{ $t('c.navigation.dashboardLeftPanel.achievements') }}
        </CvSideNavLink>

        <CvSideNavLink :to="localeRoute('dashboard-traffic')">
            <template slot="nav-icon"><Analytics16 /></template>
            {{ $t('c.navigation.dashboardLeftPanel.traffic') }}
        </CvSideNavLink>

        <CvSideNavLink :to="localeRoute('dashboard-emissions')">
            <template slot="nav-icon"><Activity16 /></template>
            <!-- ChartBubblePacked, ChartBubble, ChartCandlestick, Meter -->
            {{ $t('c.navigation.dashboardLeftPanel.emissions') }}
        </CvSideNavLink>

        <CvSideNavLink :to="localeRoute('dashboard-known-pages')">
            <template slot="nav-icon"><ListBulleted16 /></template>
            {{ $t('c.navigation.dashboardLeftPanel.index') }}
        </CvSideNavLink>

        <Divider />

        <CvSideNavLink :to="localeRoute('dashboard-badge')">
            <template slot="nav-icon"><Badge16 /></template>
            <!-- Certificate -->
            {{ $t('c.navigation.dashboardLeftPanel.badge') }}
        </CvSideNavLink>

        <!-- TODO: Implement GDPR Info Page -->
        <!-- <CvSideNavLink :to="localeRoute('dashboard-gdpr-info')">
            <template slot="nav-icon"><Information16 /></template>
            {{ $t('c.navigation.dashboardLeftPanel.gdpr') }}
        </CvSideNavLink> -->

        <CvSideNavLink :to="localeRoute('dashboard-tracking-code')">
            <template slot="nav-icon">
                <WarningFilled16 v-if="domainNotVerified" class="warn-icon" />
                <Code16 v-else />
            </template>
            <span v-if="domainNotVerified" class="warn-label">{{
                $t('c.navigation.dashboardLeftPanel.verifyDomainOwnership')
            }}</span>
            <span v-else>{{
                $t('c.navigation.dashboardLeftPanel.trackingCode')
            }}</span>
        </CvSideNavLink>

        <Divider />

        <CvSideNavLink class="function" @click="startCustomerPortalSession">
            <template slot="nav-icon"><Receipt16 /></template>
            {{ $t('c.navigation.dashboardLeftPanel.stripe') }}
        </CvSideNavLink>

        <CvSideNavLink :to="localeRoute('dashboard-account-settings')">
            <template slot="nav-icon"><Settings16 /></template>
            {{ $t('c.navigation.dashboardLeftPanel.accountSettings') }}
        </CvSideNavLink>
    </CvSideNavItems>
    <CvSideNavItems v-else>
        <CvSkeletonText
            :heading="true"
            :paragraph="true"
            :line-count="4"
            width="100%"
            class="px-05"
        >
        </CvSkeletonText>

        <Divider />

        <CvSkeletonText
            :heading="true"
            :paragraph="true"
            :line-count="3"
            width="100%"
            class="px-05 pt-05"
        >
        </CvSkeletonText>

        <Divider />

        <CvSkeletonText
            :heading="true"
            :paragraph="true"
            :line-count="3"
            width="100%"
            class="px-05 pt-05"
        >
        </CvSkeletonText>
    </CvSideNavItems>
</template>

<script>
import Activity16 from '@carbon/icons-vue/lib/activity/16'
import Add16 from '@carbon/icons-vue/lib/add/16'
import Analytics16 from '@carbon/icons-vue/lib/analytics/16'
import Badge16 from '@carbon/icons-vue/lib/badge/16'
import Code16 from '@carbon/icons-vue/lib/code/16'
import Http16 from '@carbon/icons-vue/lib/HTTP/16'
// import Information16 from '@carbon/icons-vue/lib/information/16'
import ListBulleted16 from '@carbon/icons-vue/lib/list--bulleted/16'
import Receipt16 from '@carbon/icons-vue/lib/receipt/16'
import Settings16 from '@carbon/icons-vue/lib/settings/16'
import Sprout16 from '@carbon/icons-vue/lib/sprout/16'
import WarningFilled16 from '@carbon/icons-vue/lib/warning--filled/16'

import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        Activity16,
        Add16,
        Analytics16,
        Badge16,
        Code16,
        Http16,
        // Information16,
        ListBulleted16,
        Receipt16,
        Settings16,
        Sprout16,
        WarningFilled16,
    },
    data() {
        return {
            faviconLoaded: false,
        }
    },
    async fetch({ store }) {
        if (store.getters['domains/getSelectedDomain']) return
        if (!store.getters['auth/getUser']) {
            await store.dispatch('auth/fetchUser')
        }
        await store.dispatch(
            'domains/fetchUserDomains',
            store.getters['auth/getUser'].id
        )
    },
    computed: {
        ...mapGetters({
            getPortalSessionUrl: 'subscriptions/getPortalSessionUrl',
            getSelectedDomain: 'domains/getSelectedDomain',
            getUserDomains: 'domains/getUserDomains',
        }),
        getOtherUserDomains() {
            if (!this?.getUserDomains?.length) {
                return []
            }
            return this.getUserDomains.filter((domain) => {
                return domain.id !== this.getSelectedDomain.id
            })
        },
        domainNotVerified() {
            if (this.getSelectedDomain && !this.getSelectedDomain.verifiedAt) {
                return true
            }
            return false
        },
    },
    methods: {
        ...mapActions({
            createPortalSession: 'subscriptions/createPortalSession',
            setSelectedDomain: 'domains/setSelectedDomain',
        }),
        onFaviconLoad() {
            this.faviconLoaded = true
        },
        handleSelectDomain(domain) {
            this.setSelectedDomain(domain)
        },
        async startCustomerPortalSession() {
            if (!this.getSelectedDomain?.id) return
            await this.createPortalSession({
                domainId: this.getSelectedDomain.id,
            })
            if (this.getPortalSessionUrl) {
                // Redirect User to Stripe Customer Portal Session
                window.location.href = this.getPortalSessionUrl
            }
        },
    },
}
</script>

<style lang="scss">
// Using a global style tag, because those styles are apllied to a component
#side-nav-left {
    .bx--side-nav__menu .bx--side-nav__link {
        padding-left: 3.5rem !important;
    }

    .icon-positioning--add {
        cursor: pointer;

        .bx--side-nav__link {
            padding-left: 2rem !important;
        }

        .bx--side-nav__link-text {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            svg {
                margin-right: 0.5rem; // $spacing-03
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.favicon--wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: $spacing-06;
    height: $spacing-06;
}

.favicon {
    max-width: 100%;
    max-height: 100%;
}

.px-05 {
    padding-left: $spacing-05;
    padding-right: $spacing-05;
}

.pt-05 {
    padding-top: $spacing-05;
}

.warn-icon {
    fill: $support-error;
}

.warn-label {
    color: $support-error;
}

.function {
    cursor: pointer;
}
</style>
