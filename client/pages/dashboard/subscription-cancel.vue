<template>
    <section class="bx--row">
        <div
            class="bx--col-sm-4 bx--offset-md-2 bx--col-md-4 bx--col-lg-8 bx--offset-xlg-6 bx--col-xlg-4 mb-07"
        >
            <h1>Ouch, seems like something went wrong</h1>
            <!-- TODO: Handle subscription cancel case -->
        </div>
    </section>
</template>

<script>
export default {
    layout: 'minimal',
    middleware: ['auth'],
}
</script>
