<template>
    <p v-if="$fetchState.pending">Fetching mountains...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
        <p>{{ mountains }}</p>
        <button @click="$fetch">Refresh</button>
    </div>
</template>

<script>
export default {
    data() {
        return { mountains: [] }
    },
    async fetch() {
        this.mountains = await fetch(
            'http://localhost:4000/api/v1'
        ).then((res) => res.text())
    },
}
</script>
