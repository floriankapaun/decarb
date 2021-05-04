<template>
    <section class="bx--row">
        <div class="bx--col-md-4 bx--col-lg-8 bx--col-max-6 mb-07">
            <h1>Tracking Code</h1>
            <p>
                Copy the eco web tag and paste it into the
                <code>&lt;head&gt;</code> section of the HTML code. If you are
                using a website builder like Wordpress or Shopify, copy the tag
                and paste it into the appropriate custom HTML code field.
            </p>
        </div>
        <div class="bx--col-lg-16 mb-07">
            <CvCodeSnippetSkeleton
                v-if="isLoading"
                kind="multiline"
            ></CvCodeSnippetSkeleton>
            <CvCodeSnippet
                v-else
                kind="multiline"
                copy-feedback="Content copied!"
                less-text="Show less"
                more-text="Show more"
                >{{ code }}</CvCodeSnippet
            >
        </div>
        <div class="bx--col-md-4 bx--col-lg-8 bx--col-max-6">
            <p class="mb-05">
                Make sure to verify if your implementation was successfull.
            </p>
            <CvButton>Verify Implementation</CvButton>
        </div>
    </section>
</template>

<script>
/* eslint-disable no-useless-escape */

export default {
    layout: 'dashboard',
    data() {
        return {
            isLoading: false,
            code: `<!-- Eco Web -->
<script src="https://eco-website.com/script.js"><\/script>`,
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/carbon-utils';

.mb-05 {
    margin-bottom: $spacing-05;
}

.mb-07 {
    margin-bottom: $spacing-07;
}
</style>
