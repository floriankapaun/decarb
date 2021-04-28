<template>
    <div>
        <h1>Hello authenticated World.</h1>
    </div>
</template>

<script>
export default {
    middleware({ store, redirect }) {
        const isAuthenticated = store.state.authenticated
        if (!isAuthenticated) {
            return redirect('/login')
        }
    },
}
</script>
