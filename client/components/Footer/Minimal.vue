<template>
    <footer class="bx--row">
        <div class="bx--col-sm-2 bx--col-md-2 bx--col-lg-4">
            <p class="copyright">© {{ year }} Eco Web</p>
        </div>
        <div class="bx--col-sm-2 bx--col-md-2 bx--col-lg-4">
            <p><CvLink to="imprint">Imprint</CvLink></p>
        </div>
        <div class="bx--col-sm-2 bx--col-md-2 bx--col-lg-4">
            <p><CvLink to="data-privacy">Data privacy</CvLink></p>
        </div>
        <div class="bx--col-sm-2 bx--col-md-2 bx--col-lg-4">
            <!-- TODO: Change link to "open cookie modal" -->
            <p><CvLink to="data-privacy">Cookie Settings</CvLink></p>
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
@import '@/assets/scss/carbon-utils';

footer {
    margin-top: $spacing-10;
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
