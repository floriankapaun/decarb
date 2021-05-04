<template>
    <CvSideNavItems>
        <CvHeaderSideNavItems divider>
            <CvSideNavMenu title="www.your-domain.com">
                <template slot="nav-icon">
                    <!-- Include: Domains Favicon if possible -->
                    <Badge16 />
                </template>
                <CvHeaderMenuItem to="javascript:void(0)"
                    >www.another-domain.de</CvHeaderMenuItem
                >
                <CvHeaderMenuItem to="javascript:void(0)"
                    >www.florian-kapaun.de</CvHeaderMenuItem
                >
            </CvSideNavMenu>
        </CvHeaderSideNavItems>

        <CvSideNavLink to="dashboard/achievements-offsettings">
            <template slot="nav-icon"><Sprout16 /></template>
            Achievements/Offsettings
        </CvSideNavLink>

        <CvSideNavLink to="dashboard/traffic">
            <template slot="nav-icon"><Analytics16 /></template>
            Traffic
        </CvSideNavLink>

        <CvSideNavLink to="dashboard/emissions">
            <template slot="nav-icon"><Activity16 /></template>
            <!-- ChartBubblePacked, ChartBubble, ChartCandlestick, Meter -->
            Emissions
        </CvSideNavLink>

        <CvSideNavLink to="dashboard/page-index">
            <template slot="nav-icon"><ListBulleted16 /></template>
            Index
        </CvSideNavLink>

        <Divider />

        <CvSideNavLink to="dashboard/badge">
            <template slot="nav-icon"><Badge16 /></template>
            <!-- Certificate -->
            Badge
        </CvSideNavLink>

        <CvSideNavLink to="dashboard/gdpr-info">
            <template slot="nav-icon"><Information16 /></template>
            <!-- Rule, Security -->
            GDPR Info
        </CvSideNavLink>

        <!-- TODO: If verification wasn't successfull yet, highlight this tab with a pill or something -->
        <CvSideNavLink to="dashboard/tracking-code">
            <template slot="nav-icon"><Code16 /></template>
            Tracking Code
        </CvSideNavLink>

        <Divider />

        <CvSideNavLink to="dashboard/subscription">
            <template slot="nav-icon"><Repeat16 /></template>
            Subscription
        </CvSideNavLink>

        <CvSideNavLink to="dashboard/payment-and-bills">
            <template slot="nav-icon"><Receipt16 /></template>
            Payment & Bills
        </CvSideNavLink>

        <CvSideNavLink to="dashboard/account-settings">
            <template slot="nav-icon"><Settings16 /></template>
            Account Settings
        </CvSideNavLink>
    </CvSideNavItems>
</template>

<script>
import Activity16 from '@carbon/icons-vue/lib/activity/16'
import Analytics16 from '@carbon/icons-vue/lib/analytics/16'
import Badge16 from '@carbon/icons-vue/lib/badge/16'
import Code16 from '@carbon/icons-vue/lib/code/16'
import Information16 from '@carbon/icons-vue/lib/information/16'
import ListBulleted16 from '@carbon/icons-vue/lib/list--bulleted/16'
import Receipt16 from '@carbon/icons-vue/lib/receipt/16'
import Repeat16 from '@carbon/icons-vue/lib/repeat/16'
import Settings16 from '@carbon/icons-vue/lib/settings/16'
import Sprout16 from '@carbon/icons-vue/lib/sprout/16'

export default {
    components: {
        Activity16,
        Analytics16,
        Badge16,
        Code16,
        Information16,
        ListBulleted16,
        Receipt16,
        Repeat16,
        Settings16,
        Sprout16,
    },
}
</script>
