<template>
    <div>
        <h1>Overview</h1>
        <CvAspectRatio ratio="16x9">
            <CvTile kind="clickable" to="dashboard/page">
                <h2>Content</h2>
                <p>test</p>
            </CvTile>
        </CvAspectRatio>
    </div>
</template>

<script>
export default {
    layout: 'dashboard',
    middleware: ['auth'],
}
</script>
