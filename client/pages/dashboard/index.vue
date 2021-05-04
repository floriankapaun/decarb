<template>
    <section class="bx--row">
        <div class="bx--col-lg-16">
            <h1>Overview</h1>
        </div>
        <div class="bx--col-lg-8 col--card">
            <Card headline="Achievements">
                <p>Wow ey!</p>
            </Card>
        </div>
        <div class="bx--col-lg-8 col--card">
            <Card headline="Pageviews">
                <p>Wow ey!</p>
            </Card>
        </div>
        <div class="bx--col-lg-8 col--card">
            <Card headline="Emission Development">
                <p>Wow ey!</p>
            </Card>
        </div>
    </section>
</template>

<script>
export default {
    layout: 'dashboard',
    middleware: ['auth'],
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/carbon-utils';

h1 {
    margin-bottom: $spacing-07;
}

.col--card {
    margin-bottom: $spacing-07;
}
</style>
