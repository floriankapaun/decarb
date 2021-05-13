<template>
    <CvSideNavItems v-if="getSelectedDomain">
        <CvSideNavMenu :title="getSelectedDomain.url">
            <template slot="nav-icon">
                <!-- Include: Domains Favicon if possible -->
                <div v-show="faviconLoaded" class="favicon--wrapper">
                    <img
                        :src="`https://${getSelectedDomain.url}/favicon.ico`"
                        :alt="`${getSelectedDomain.url} favicon`"
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
                to="/dashboard/register-domain"
                class="icon-positioning--add"
            >
                <Add16 /> Add new Domain
            </CvSideNavMenuItem>
        </CvSideNavMenu>

        <Divider />

        <CvSideNavLink to="/dashboard/achievements-offsettings">
            <template slot="nav-icon"><Sprout16 /></template>
            Achievements/Offsettings
        </CvSideNavLink>

        <CvSideNavLink to="/dashboard/traffic">
            <template slot="nav-icon"><Analytics16 /></template>
            Traffic
        </CvSideNavLink>

        <CvSideNavLink to="/dashboard/emissions">
            <template slot="nav-icon"><Activity16 /></template>
            <!-- ChartBubblePacked, ChartBubble, ChartCandlestick, Meter -->
            Emissions
        </CvSideNavLink>

        <CvSideNavLink to="/dashboard/page-index">
            <template slot="nav-icon"><ListBulleted16 /></template>
            Index
        </CvSideNavLink>

        <Divider />

        <CvSideNavLink to="/dashboard/badge">
            <template slot="nav-icon"><Badge16 /></template>
            <!-- Certificate -->
            Badge
        </CvSideNavLink>

        <CvSideNavLink to="/dashboard/gdpr-info">
            <template slot="nav-icon"><Information16 /></template>
            <!-- Rule, Security -->
            GDPR Info
        </CvSideNavLink>

        <!-- TODO: If verification wasn't successfull yet, highlight this tab with a pill or something -->
        <CvSideNavLink to="/dashboard/tracking-code">
            <template slot="nav-icon"><Code16 /></template>
            Tracking Code
        </CvSideNavLink>

        <Divider />

        <CvSideNavLink to="/dashboard/subscription">
            <template slot="nav-icon"><Repeat16 /></template>
            Subscription
        </CvSideNavLink>

        <CvSideNavLink to="/dashboard/payment-and-bills">
            <template slot="nav-icon"><Receipt16 /></template>
            Payment & Bills
        </CvSideNavLink>

        <CvSideNavLink to="/dashboard/account-settings">
            <template slot="nav-icon"><Settings16 /></template>
            Account Settings
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
import Information16 from '@carbon/icons-vue/lib/information/16'
import ListBulleted16 from '@carbon/icons-vue/lib/list--bulleted/16'
import Receipt16 from '@carbon/icons-vue/lib/receipt/16'
import Repeat16 from '@carbon/icons-vue/lib/repeat/16'
import Settings16 from '@carbon/icons-vue/lib/settings/16'
import Sprout16 from '@carbon/icons-vue/lib/sprout/16'

import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        Activity16,
        Add16,
        Analytics16,
        Badge16,
        Code16,
        Http16,
        Information16,
        ListBulleted16,
        Receipt16,
        Repeat16,
        Settings16,
        Sprout16,
    },
    data() {
        return {
            faviconLoaded: false,
        }
    },
    computed: {
        ...mapGetters({
            getUserDomains: 'domains/getUserDomains',
            getSelectedDomain: 'domains/getSelectedDomain',
        }),
        getOtherUserDomains() {
            if (!this.getUserDomains || !this.getUserDomains.length) {
                return []
            }
            return this.getUserDomains.filter((domain) => {
                return domain.id !== this.getSelectedDomain.id
            })
        },
    },
    methods: {
        ...mapActions({
            setSelectedDomain: 'domains/setSelectedDomain',
        }),
        onFaviconLoad(e) {
            this.faviconLoaded = true
        },
        handleSelectDomain(domain) {
            this.setSelectedDomain(domain)
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
@import '@/assets/scss/carbon-utils';

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
</style>
