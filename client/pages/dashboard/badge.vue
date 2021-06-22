<template>
    <section class="bx--row">
        <div class="bx--col-md-4 bx--col-lg-8 bx--col-max-6 mb-07">
            <h1>{{ $t('p.dashboard.badge.h1') }}</h1>
            <p>{{ $t('p.dashboard.badge.p') }}</p>

            <CvSelect
                v-model="selectedBadgeColorscheme"
                :label="$t('p.dashboard.badge.colorschemeLabel')"
            >
                <CvSelectOption
                    v-for="colorscheme in $config.ENUMS.badgeColorscheme"
                    :key="colorscheme"
                    :value="colorscheme"
                >
                    {{ $t(`m.enums.badgeColorscheme.${colorscheme}`) }}
                </CvSelectOption>
            </CvSelect>
        </div>
        <div class="bx--col-lg-16 mb-07" v-html="codeSnippet"></div>
        <div class="bx--col-lg-16 mb-07">
            <CvCodeSnippet
                kind="multiline"
                :copy-feedback="$t('p.dashboard.badge.code.copyFeedback')"
                :less-text="$t('p.dashboard.badge.code.showLess')"
                :more-text="$t('p.dashboard.badge.code.showMore')"
                :wrap-text="true"
                >{{ codeSnippet }}</CvCodeSnippet
            >
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'DashboardBadge',
    layout: 'dashboard',
    nuxtI18n: {
        paths: {
            en: '/dashboard/badge',
        },
    },
    data() {
        return {
            selectedBadgeType: this.$config.ENUMS.badgeType[0],
            selectedBadgeColorscheme: this.$config.ENUMS.badgeColorscheme[0],
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
            getSelectedDomain: 'domains/getSelectedDomain',
        }),
        publicMemberUrl() {
            const domainUrl = this.getSelectedDomain?.url ?? ''
            return `${this.$config.CLIENT_ENTRYPOINT}/members/${domainUrl}`
        },
        badgeSrc() {
            const domainId = '_'
            const type = this.selectedBadgeType
            const colorscheme = this.selectedBadgeColorscheme
            return `${this.$config.API_ENTRYPOINT}/badges/${domainId}/${type}/${colorscheme}`
        },
        codeSnippet() {
            const alt = this.$t('p.dashboard.badge.imgAlt')
            return `<a href="${this.publicMemberUrl}" target="_blank" rel="noopener"><img src="${this.badgeSrc}" alt="${alt}" width="220"></a>`
        },
    },
}
</script>

<style lang="scss" scoped>
.mb-05 {
    margin-bottom: $spacing-05;
}

.mb-07 {
    margin-bottom: $spacing-07;
}
</style>
