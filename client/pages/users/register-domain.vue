<template>
    <div>
        <h1>Hello authenticated World.</h1>
    </div>
</template>

<script>
export default {
    layout: 'minimal',
    // middleware({ store, redirect }) {
    //     // const isAuthenticated = store.state.authenticated
    //     // if (!isAuthenticated) {
    //     //     return redirect('/login')
    //     // }
    // },
    middleware: ['auth'],
}
</script>
