<template>
    <CvCodeSnippetSkeleton
        v-if="isLoading"
        kind="multiline"
    ></CvCodeSnippetSkeleton>
    <CvCodeSnippet
        v-else
        kind="multiline"
        :copy-feedback="$t('c.trackingCode.copyFeedback')"
        :less-text="$t('c.trackingCode.showLess')"
        :more-text="$t('c.trackingCode.showMore')"
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
            code: `<!-- ${this.$config.PROJECT_NAME} Ping Script -->
<script src="${this.$config.PING_SCRIPT_URL}" async><\/script>`,
        }
    },
}
</script>
