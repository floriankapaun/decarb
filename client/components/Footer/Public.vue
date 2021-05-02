<template>
    <footer class="bx--row">
        <div class="bx--col-sm-4 bx--col-md-4 bx--col-lg-8 mb-3">
            <p class="copyright">© {{ year }} Eco Web</p>
        </div>
        <div class="bx--col-sm-2 bx--col-md-2 bx--col-lg-4">
            <p><CvLink to="imprint">Imprint</CvLink></p>
            <p><CvLink to="data-privacy">Data privacy</CvLink></p>
        </div>
        <div class="bx--col-sm-2 bx--col-md-2 bx--col-lg-4">
            <p><CvLink to="about">About</CvLink></p>
            <p><CvLink to="why">Why</CvLink></p>
            <p><CvLink to="how-it-works">How it works</CvLink></p>
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
