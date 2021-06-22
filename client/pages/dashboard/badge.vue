<template>
    <section>
        <div class="bx--row">
            <div class="bx--col-sm-4 p-mb">
                <h1>{{ $t('p.dashboard.badge.h1') }}</h1>
                <p>{{ $t('p.dashboard.badge.p') }}</p>
            </div>
        </div>
        <div class="bx--row">
            <div
                class="bx--col-sm-4 bx--col-md-4 bx--col-lg-6 bx--col-xlg-4 mb"
            >
                <CvSelect
                    v-model="selectedBadgeColorscheme"
                    :label="$t('p.dashboard.badge.colorschemeLabel')"
                    class="select"
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
        </div>

        <div class="bx--row">
            <div
                class="bx--col-sm-4 bx--col-md-6 bx--col-lg-12 bx--col-xlg-8 mb"
            >
                <CvTile kind="standard" :light="false" class="badge-wrapper">
                    <div v-html="codeSnippet"></div>
                </CvTile>
            </div>
        </div>
        <div class="bx--row">
            <div class="bx--col-sm-4 bx--col-md-6 bx--col-lg-12 bx--col-xlg-8">
                <CvCodeSnippet
                    kind="multiline"
                    :copy-feedback="$t('p.dashboard.badge.code.copyFeedback')"
                    :less-text="$t('p.dashboard.badge.code.showLess')"
                    :more-text="$t('p.dashboard.badge.code.showMore')"
                    :wrap-text="true"
                    >{{ codeSnippet }}</CvCodeSnippet
                >
            </div>
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
.p-mb {
    margin-bottom: $spacing-06;
    @include carbon--breakpoint(md) {
        margin-bottom: $spacing-09;
    }
}

.mb {
    margin-bottom: $spacing-07;
    @include carbon--breakpoint(md) {
        margin-bottom: $spacing-10;
    }
}

.badge-wrapper {
    text-align: center;
    padding-top: $spacing-07;
    padding-bottom: $spacing-07;
    @include carbon--breakpoint(md) {
        padding-top: $spacing-09;
        padding-bottom: $spacing-09;
    }
}
</style>
