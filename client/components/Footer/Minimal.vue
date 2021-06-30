<template>
    <footer>
        <p class="footer--text">
            <span class="footer--text-section">{{
                $t('c.footer.minimal.copyright', { year })
            }}</span>
            <span class="footer--text-section"
                ><CvLink :to="localeRoute('legal-imprint')" size="sm">
                    {{ $t('c.footer.minimal.imprint') }}
                </CvLink></span
            >
            <span class="footer--text-section"
                ><CvLink :to="localeRoute('legal-data-privacy')" size="sm">
                    {{ $t('c.footer.minimal.dataPrivacy') }}
                </CvLink></span
            >
            <!-- TODO: Change link to "open cookie modal" -->
            <span class="footer--text-section"
                ><CvLink :to="localeRoute('legal-data-privacy')" size="sm">
                    {{ $t('c.footer.minimal.cookieSettings') }}
                </CvLink></span
            >
        </p>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear(),
        }
    },
}
</script>

<style lang="scss" scoped>
.footer--text {
    width: 100%;
    max-width: unset;
    @include carbon--type-style('helper-text-01');

    &-section {
        display: inline-block;
        margin-bottom: $spacing-03;

        & + .footer--text-section {
            margin-left: $spacing-03;
            &::before {
                content: ' · ';
                margin-right: $spacing-03;
            }
        }
    }
}
</style>
