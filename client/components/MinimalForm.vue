<template>
    <section>
        <h1 class="mb-xs">{{ title }}</h1>
        <p class="mb-md">
            <slot name="text"></slot>
        </p>
        <NotificationsInline class="mb-sm" />
        <slot name="form"></slot>
        <slot name="helper"></slot>
    </section>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
    },
}
</script>
