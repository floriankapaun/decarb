<template>
    <CvAspectRatio ratio="16x9" class="card">
        <div class="card--header">
            <h2 class="card--header--headline">{{ headline }}</h2>
            <CvLink to="dashboard/pageviews" size="lg">
                open report
                <template slot="icon"><ArrowRight16 /></template>
            </CvLink>
        </div>
        <Divider width="full" />
        <div class="card--body">
            <slot></slot>
        </div>
    </CvAspectRatio>
</template>

<script>
import ArrowRight16 from '@carbon/icons-vue/lib/arrow--right/16'

export default {
    components: { ArrowRight16 },
    props: {
        headline: {
            type: String,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/carbon-utils';

.card {
    background-color: $ui-01;

    &--header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: $spacing-05 $spacing-05 0 $spacing-05;

        &--headline {
            @include carbon--type-style('productive-heading-03');
        }
    }

    &--body {
        padding: 0 $spacing-05 $spacing-05 $spacing-05;
    }
}
</style>
