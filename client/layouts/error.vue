<template>
    <div>
        <HeaderMinimal />
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred</h1>
        <CvLink :to="localeRoute('index')" size="lg">Home page</CvLink>
    </div>
</template>

<script>
export default {
    name: 'Error',
    layout: 'error', // you can set a custom layout for the error page
    props: ['error'],
}
</script>
