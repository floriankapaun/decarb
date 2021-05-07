<template>
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
        :wrap-text="true"
        >{{ code }}</CvCodeSnippet
    >
</template>

<script>
/* eslint-disable no-useless-escape */

export default {
    data() {
        return {
            isLoading: false,
            code: `<!-- Eco Web -->
<script src="https://eco-website.comco-website.comco-website.com/script.js"><\/script>`,
        }
    },
}
</script>
