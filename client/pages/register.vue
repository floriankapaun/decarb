<template>
    <main>
        <h1>Create your eco-Web Account</h1>
        <form action="">
            <label for="email">E-Mail Address</label>
            <input
                id="email"
                type="email"
                ref="email"
                placeholder="your@email.com"
            />
            <button type="submit" @click="submit">Create Account</button>
        </form>
        <p>
            Already have an account?
            <NuxtLink to="login">Sign in now</NuxtLink>.
        </p>
    </main>
</template>

<script>
export default {
    layout: 'minimal',
    // data() {
    //     return { mountains: [] }
    // },
    // async fetch() {
    //     this.mountains = await fetch(
    //         'http://localhost:4000/api/v1/domains'
    //     ).then((res) => res.text())
    // },
    methods: {
        async submit() {
            const email = this.$refs.email.value
            const response = await fetch('http://localhost:4000/api/v1/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            return response
        },
    },
}
</script>
