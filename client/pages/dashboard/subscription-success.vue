<template>
    <MinimalForm :title="$t('p.dashboard.subscriptionSuccess.h1')">
        <template #text>
            <i18n path="p.dashboard.subscriptionSuccess.p" tag="span">
                <template #link>
                    <CvLink :to="localeRoute('dashboard-badge')" size="lg">{{
                        $t('p.dashboard.subscriptionSuccess.link')
                    }}</CvLink>
                </template>
                <template #url>
                    {{
                        getUrl
                            ? getUrl
                            : $t('p.dashboard.subscriptionSuccess.urlDefault')
                    }}
                </template>
            </i18n>
        </template>

        <template #form>
            <p>
                <NuxtLink
                    :to="localeRoute('dashboard')"
                    class="bx--btn bx--btn--primary"
                >
                    {{ $t('p.dashboard.subscriptionSuccess.button') }}
                </NuxtLink>
            </p>
        </template>
    </MinimalForm>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'DashboardSubscriptionSuccess',
    layout: 'minimal',
    nuxtI18n: {
        paths: {
            en: '/dashboard/subscription-success',
        },
    },
    middleware: ['auth'],
    computed: {
        ...mapGetters({
            getSelectedDomain: 'domains/getSelectedDomain',
        }),
        getUrl() {
            return this.getSelectedDomain && this.getSelectedDomain.url
                ? this.getSelectedDomain.url
                : null
        },
    },
}
</script>
