<template>
    <div>
        <h1>Overview</h1>
        <!-- <CvAspectRatio ratio="16x9"> -->
        <div class="bx--aspect-ratio bx--aspect-ratio--1x1">
            <CvTile kind="clickable" to="dashboard/page">
                <h2>Content</h2>
                <p>test</p>
            </CvTile>
        </div>
        <!-- </CvAspectRatio> -->
    </div>
</template>

<script>
export default {
    layout: 'dashboard',
    middleware: ['auth'],
}
</script>
