<template>
    <footer class="bx--row">
        <div class="bx--col-sm-2 bx--col-md-2 bx--col-lg-4">
            <p>© {{ year }} Eco Web</p>
        </div>
        <div class="bx--col-sm-2 bx--col-md-2 bx--col-lg-4">
            <p>
                <CvLink :to="localeRoute('/legal/imprint')">Imprint</CvLink>
            </p>
        </div>
        <div class="bx--col-sm-2 bx--col-md-2 bx--col-lg-4">
            <p>
                <CvLink :to="localeRoute('/legal/data-privacy')">
                    Data privacy
                </CvLink>
            </p>
        </div>
        <div class="bx--col-sm-2 bx--col-md-2 bx--col-lg-4">
            <!-- TODO: Change link to "open cookie modal" -->
            <p>
                <CvLink :to="localeRoute('/legal/data-privacy')">
                    Cookie Settings
                </CvLink>
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
    margin-top: $spacing-13;
}

p {
    @include carbon--type-style('body-short-01');
}

.bx--link {
    margin-bottom: $spacing-03;
}

@media (min-width: 1056px) {
    .bx--link {
        margin-bottom: 0;
    }
}
</style>
