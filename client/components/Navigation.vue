<template>
    <CvHeader aria-label="Carbon tutorial">
        <CvSkipToContent href="#main-content">Skip to content</CvSkipToContent>
        <CvHeaderName href="/" prefix="IBM">Carbon Tutorial</CvHeaderName>
        <CvHeaderNav>
            <CvHeaderMenuItem href="/repos">Repositories</CvHeaderMenuItem>
        </CvHeaderNav>
        <template slot="header-global">
            <CvHeaderGlobalAction aria-label="Notifications">
                <Notification20 />
            </CvHeaderGlobalAction>
            <CvHeaderGlobalAction aria-label="User avatar">
                <UserAvatar20 />
            </CvHeaderGlobalAction>
            <CvHeaderGlobalAction aria-label="App switcher">
                <AppSwitcher20 />
            </CvHeaderGlobalAction>
        </template>
    </CvHeader>
</template>

<script>
import {
    CvHeader,
    CvSkipToContent,
    CvHeaderName,
    CvHeaderNav,
    CvHeaderMenuItem,
    CvHeaderGlobalAction,
} from '@carbon/vue'

import Notification20 from '@carbon/icons-vue/lib/notification/20'
import UserAvatar20 from '@carbon/icons-vue/lib/user--avatar/20'
import AppSwitcher20 from '@carbon/icons-vue/lib/app-switcher/20'

export default {
    name: 'Navigation',
    components: {
        CvHeader,
        CvSkipToContent,
        CvHeaderName,
        CvHeaderNav,
        CvHeaderMenuItem,
        CvHeaderGlobalAction,
        Notification20,
        UserAvatar20,
        AppSwitcher20,
    },
}
</script>
