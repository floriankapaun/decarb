<template>
    <section class="tile--wrapper">
        <hgroup class="tile--heading-wrapper mb-md">
            <Component :is="`h${level}`" v-if="title">{{ title }}</Component>
            <p v-if="subtitle" class="tile--subtitle">{{ subtitle }}</p>
        </hgroup>
        <div class="tile--content mb-md">
            <p
                v-if="info"
                :class="[
                    'tile--content--info',
                    `tile--content--info-${infoColor}`,
                ]"
            >
                {{ info }}
            </p>
            <p
                v-if="note && typeof note === 'string'"
                class="tile--content--note"
            >
                {{ note }}
            </p>
            <i18n
                v-else-if="note && typeof note === 'object'"
                :path="note.i18nPath"
                tag="p"
                class="tile--content--note"
            >
                <!-- is not working if used #link -->
                <template v-slot:link>
                    <a
                        class="tile--content--note-link"
                        :href="note.href"
                        target="_blank"
                        rel="noopener"
                    >
                        {{ note.linkText }}
                    </a>
                </template>
            </i18n>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        level: {
            type: String,
            default: '2',
        },
        title: {
            type: String,
            default: undefined,
        },
        subtitle: {
            type: String,
            default: undefined,
        },
        info: {
            type: String,
            default: undefined,
        },
        infoColor: {
            type: String,
            default: 'ink',
            validator: (val) => {
                const options = ['ink', 'primary']
                const result = options.includes(val)
                if (!result) {
                    console.warn(
                        `Invalid option supplied to "InsightTile.infoColor": "${val}".`
                    )
                }
                return result
            },
        },
        note: undefined, // String or Object
    },
}
</script>

<style lang="scss" scoped>
.tile {
    &--subtitle {
        color: $text-secondary;
    }

    &--content {
        text-align: center;

        &--info {
            margin-bottom: $spacing-03;
            @include decarb--type-style(display-04);

            &-primary {
                color: $primary;
            }
        }

        &--note {
            max-width: unset;
            color: $text-secondary;
            @include decarb--type-style(body-short-01);

            &-link {
                text-decoration: none;
            }
        }
    }
}
</style>
