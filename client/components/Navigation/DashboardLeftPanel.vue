<template>
    <CvSideNavItems>
        <CvHeaderSideNavItems divider>
            <CvSideNavMenu title="www.your-domain.com">
                <template slot="nav-icon">
                    <!-- Include: Domains Favicon if possible -->
                    <Badge16 />
                </template>
                <CvHeaderMenuItem href="javascript:void(0)"
                    >www.another-domain.de</CvHeaderMenuItem
                >
                <CvHeaderMenuItem href="javascript:void(0)"
                    >www.florian-kapaun.de</CvHeaderMenuItem
                >
            </CvSideNavMenu>
        </CvHeaderSideNavItems>

        <CvSideNavLink href="/achievements-offsettings">
            <template slot="nav-icon"><Sprout16 /></template>
            Achievements/Offsettings
        </CvSideNavLink>

        <CvSideNavLink href="/traffic">
            <template slot="nav-icon"><Analytics16 /></template>
            Traffic
        </CvSideNavLink>

        <CvSideNavLink href="/emissions">
            <template slot="nav-icon"><Activity16 /></template>
            <!-- ChartBubblePacked, ChartBubble, ChartCandlestick, Meter -->
            Emissions
        </CvSideNavLink>

        <CvSideNavLink href="/index">
            <template slot="nav-icon"><ListBulleted16 /></template>
            Index
        </CvSideNavLink>

        <div class="divider"></div>

        <CvSideNavLink href="/badge">
            <template slot="nav-icon"><Badge16 /></template>
            <!-- Certificate -->
            Badge
        </CvSideNavLink>

        <CvSideNavLink href="/gdpr-info">
            <template slot="nav-icon"><Information16 /></template>
            <!-- Rule, Security -->
            GDPR Info
        </CvSideNavLink>

        <CvSideNavLink href="/tracking-code">
            <template slot="nav-icon"><Code16 /></template>
            Tracking Code
        </CvSideNavLink>

        <div class="divider"></div>

        <CvSideNavLink href="/subscription">
            <template slot="nav-icon"><Repeat16 /></template>
            Subscription
        </CvSideNavLink>

        <CvSideNavLink href="/payment-and-bills">
            <template slot="nav-icon"><Receipt16 /></template>
            Payment & Bills
        </CvSideNavLink>

        <CvSideNavLink href="/account-settings">
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

<style lang="scss" scoped>
.divider {
    position: relative;
    display: block;
    margin-bottom: 2rem;

    &::after {
        position: absolute;
        bottom: -1rem;
        left: 1rem;
        width: calc(100% - 32px);
        height: 0.0625rem;
        background: #e0e0e0;
        content: '';
    }
}
</style>