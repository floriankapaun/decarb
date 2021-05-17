<template>
    <footer class="bx--row">
        <div class="bx--col-sm-4 bx--col-md-4 bx--col-lg-8 mb-3">
            <p class="copyright">
                {{ $t('c.footer.public.copyright', { year }) }}
            </p>
        </div>
        <div class="bx--col-sm-2 bx--col-md-2 bx--col-lg-4">
            <p>
                <CvLink :to="localeRoute('legal-imprint')">
                    {{ $t('c.footer.public.imprint') }}
                </CvLink>
            </p>
            <p>
                <CvLink :to="localeRoute('legal-data-privacy')">
                    {{ $t('c.footer.public.dataPrivacy') }}
                </CvLink>
            </p>
            <p>
                <CvLink :to="localeRoute('legal-terms-and-conditions')">
                    {{ $t('c.footer.public.termsAndConditions') }}
                </CvLink>
            </p>
            <p>
                <CvLink :to="localeRoute('legal-terms-and-conditions')">
                    <!-- TODO: Change link to "open cookie modal" -->
                    {{ $t('c.footer.public.cookieSettings') }}
                </CvLink>
            </p>
        </div>
        <div class="bx--col-sm-2 bx--col-md-2 bx--col-lg-4">
            <p>
                <CvLink :to="localeRoute('about')">{{
                    $t('c.footer.public.about')
                }}</CvLink>
            </p>
            <p>
                <CvLink :to="localeRoute('why')">{{
                    $t('c.footer.public.why')
                }}</CvLink>
            </p>
            <p>
                <CvLink :to="localeRoute('how-it-works')">{{
                    $t('c.footer.public.howItWorks')
                }}</CvLink>
            </p>
        </div>
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
footer {
    margin-top: $spacing-10;
}

.mb-3 {
    margin-bottom: $spacing-03;
}

.bx--link {
    margin-bottom: $spacing-03;
}

.copyright {
    font-size: 0.875rem;
}

@media (min-width: 1056px) {
    .bx--link {
        margin-bottom: 0;
    }
}
</style>
