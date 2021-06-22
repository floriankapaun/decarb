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
export default {
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
    computed: {
        codeSnippet() {
            const domainId = '_'
            const type = this.selectedBadgeType
            const colorscheme = this.selectedBadgeColorscheme
            // TODO: Refactor... API_ENTRYPOINT WON'T WORK IN PROD
            const src = `${this.$config.API_ENTRYPOINT}/badges/${domainId}/${type}/${colorscheme}`
            const alt = this.$t('p.dashboard.badge.imgAlt')
            return `<img src="${src}" alt="${alt}" width="200">`
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
