<template>
    <footer class="flex flex-row justify-between text-sm py-2 px-4 bg-gray-200">
        <NuxtLink to="imprint">Imprint</NuxtLink>
        <div>© {{ year }} Eco Web</div>
        <NuxtLink to="data-privacy">Data Privacy</NuxtLink>
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
