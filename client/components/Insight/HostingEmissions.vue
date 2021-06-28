<template>
    <section class="wrapper">
        <div class="title">
            <h2>{{ $t('c.hostingEmissions.title') }}</h2>
            <p>{{ $t('c.hostingEmissions.subtitle') }}</p>
        </div>
        <div class="content">
            <p class="big" :class="renewableEnergy ? 'text-green' : null">
                {{
                    renewableEnergy
                        ? $t('c.hostingEmissions.green')
                        : $t('c.hostingEmissions.grey')
                }}
            </p>
            <i18n path="c.hostingEmissions.source" tag="p">
                <CvLink
                    href="https://www.thegreenwebfoundation.org/"
                    target="_blank"
                    rel="noopener"
                    size="lg"
                >
                    {{ $t('c.hostingEmissions.url') }}
                </CvLink>
            </i18n>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    async fetch() {
        const store = this.$store
        if (store.getters['emissions/getHostingEmissions']) return

        // Make sure that selectedDomain exists
        if (!store.getters['domains/getSelectedDomain']) {
            if (!store.getters['auth/getUser']) {
                await store.dispatch('auth/fetchUser')
            }
            await store.dispatch(
                'domains/fetchUserDomains',
                store.getters['auth/getUser'].id
            )
        }

        // Fetch statistical data
        if (!store.getters['emissions/getHostingEmissions']) {
            await store.dispatch(
                'emissions/fetchHostingEmissions',
                store.getters['domains/getSelectedDomain'].id
            )
        }
    },
    computed: {
        ...mapGetters({
            getHostingEmissions: 'emissions/getHostingEmissions',
        }),
        renewableEnergy() {
            return this.getHostingEmissions?.renewableEnergy ?? false
        },
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.title {
    align-self: flex-start;
    margin-bottom: $spacing-06;
    @include carbon--breakpoint(md) {
        margin-bottom: $spacing-09;
    }
}

.content {
    text-align: center;
    margin-bottom: $spacing-06;
    @include carbon--breakpoint(md) {
        margin-bottom: $spacing-09;
    }
}

.big {
    @include decarb--type-style(display-04);
}

.text-green {
    color: $primary;
}
</style>
