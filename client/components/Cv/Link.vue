<template>
    <component
        :is="tagType"
        v-bind="linkProps"
        class="cv-link"
        :class="[
            `${carbonPrefix}--link`,
            `${carbonPrefix}--link--${size}`,
            { [`${carbonPrefix}--link--inline`]: inline },
        ]"
        v-on="$listeners"
    >
        <slot></slot>
        <div v-if="hasSlotIcon" :class="`${carbonPrefix}--link__icon`">
            <slot name="icon"></slot>
        </div>
    </component>
</template>

<script>
export default {
    name: 'CvLink',
    props: {
        inline: Boolean,
        disabled: Boolean,
        to: { type: [String, Object] },
        href: String,
        size: {
            type: String,
            default: 'md',
            validator: (val) => {
                const options = ['sm', 'md', 'lg']
                const result = options.includes(val)
                if (!result) {
                    console.warn(
                        `Invalid option supplied to "CvLink": "${val}".`
                    )
                }
                return result
            },
        },
    },
    data() {
        return {
            carbonPrefix: 'bx',
        }
    },
    computed: {
        tagType() {
            // if to is used and not href then user wanted a router-link
            return this.to && !this.href ? 'router-link' : 'a'
        },
        linkProps() {
            if (this.disabled) {
                return {
                    'aria-disabled': true,
                }
            } else if (this.to && !this.href) {
                return { to: this.to }
            }
            return { href: this.href }
        },
        hasSlotIcon() {
            return !!this.$slots.icon
        },
    },
}
</script>
