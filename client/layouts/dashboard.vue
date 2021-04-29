<template>
    <div>
        <HeaderDashboard />
        <div
            v-if="$nuxt.isOffline"
            class="block fixed t-0 l-0 w-100 bg-gray-300"
        >
            You are offline
        </div>
        <div>My dashbard navigation bar here</div>
        <Nuxt />
    </div>
</template>
