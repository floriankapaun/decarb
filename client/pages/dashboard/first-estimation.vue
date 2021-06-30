<template>
    <MinimalForm :title="$t('p.dashboard.firstEstimation.h1')">
        <template #helper>
            <CvSkeletonText
                v-if="!selectedDomain || !emissionAmount"
                :heading="false"
                :paragraph="true"
                :line-count="3"
                width="100%"
                class="mb-sm"
            >
            </CvSkeletonText>
            <p v-else class="mb-sm">
                {{
                    $t('p.dashboard.firstEstimation.text', {
                        amount: emissionAmount,
                        views: selectedDomain.estimatedMonthlyPageViews,
                    })
                }}
            </p>
            <p class="mb-md">
                <NuxtLink
                    :to="localeRoute('dashboard-setup-subscription')"
                    class="bx--btn bx--btn--primary"
                >
                    {{ $t('p.dashboard.firstEstimation.button') }}
                </NuxtLink>
            </p>
            <p>
                <CvLink :to="localeRoute('dashboard-pageview-estimation')">
                    {{ $t('p.dashboard.firstEstimation.adjustLink') }}
                </CvLink>
            </p>
        </template>
    </MinimalForm>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'DashboardFirstEstimation',
    layout: 'minimal',
    nuxtI18n: {
        paths: {
            en: '/dashboard/first-estimation',
        },
    },
    middleware: ['auth'],
    async fetch({ store }) {
        if (
            store.getters['domains/getSelectedDomain'] &&
            store.getters['domains/getEmissionEstimation'] &&
            store.getters['domains/getSelectedDomain']?.id ===
                store.getters['domains/getEmissionEstimation']?.id
        ) {
            return
        }
        if (!store.getters['domains/getSelectedDomain']) {
            if (!store.getters['auth/getUser']) {
                await store.dispatch('auth/fetchUser')
            }
            await store.dispatch(
                'domains/fetchUserDomains',
                store.getters['auth/getUser'].id
            )
        }
        await store.dispatch(
            'domains/fetchEmissionEstimation',
            store.getters['domains/getSelectedDomain'].id
        )
    },
    computed: {
        ...mapGetters({
            getEmissionEstimation: 'domains/getEmissionEstimation',
            getSelectedDomain: 'domains/getSelectedDomain',
        }),
        selectedDomain() {
            return this.getSelectedDomain
        },
        emissionAmount() {
            return this.getEmissionEstimation?.kilograms ?? null
        },
    },
}
</script>
