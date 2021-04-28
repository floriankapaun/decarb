<template>
    <div>
        <h2>Line Graph</h2>
        <p>This is a line graph...</p>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            setTimeout(() => this.$nuxt.$loading.finish(), 500)
        })
    },
}
</script>
