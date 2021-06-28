<template>
    <section class="wrapper">
        <div class="title">
            <h2>{{ $t('c.offsetAggregation.title') }}</h2>
            <p v-if="since">
                {{
                    $t('c.offsetAggregation.since', {
                        date: $d(new Date(since), 'short'),
                    })
                }}
            </p>
            <p v-else>{{ $t('c.offsetAggregation.fallbackSince') }}</p>
        </div>
        <div class="content">
            <p class="amount">{{ amount }}</p>
            <p>{{ $t('c.offsetAggregation.unit') }}</p>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    async fetch() {
        const store = this.$store
        if (store.getters['offsettings/getAggregation']) return

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
        if (!store.getters['offsettings/getAggregation']) {
            await store.dispatch(
                'offsettings/fetchAggregation',
                store.getters['domains/getSelectedDomain'].id
            )
        }
    },
    computed: {
        ...mapGetters({
            getAggregation: 'offsettings/getAggregation',
        }),
        amount() {
            return this.getAggregation?._sum?.offsetKilograms ?? 0
        },
        since() {
            return this.getAggregation?._min?.from
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

.amount {
    @include decarb--type-style(display-04);
}
</style>
