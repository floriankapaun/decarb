<template>
    <div>
        <p>ID: {{ test }}</p>
        <p>CONTINENT: {{ continent }}</p>
    </div>
</template>

<script>
export default {
    asyncData({ params }) {
        return {
            test: params.id,
            continent: params.continent,
        }
    },
}
</script>
