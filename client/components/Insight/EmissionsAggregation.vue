<template>
    <section class="wrapper">
        <div class="title">
            <h2>{{ $t('c.emissionAggregation.title') }}</h2>
        </div>
        <div class="content">
            <p class="amount">{{ amount }}</p>
            <p>{{ $t('c.emissionAggregation.unit') }}</p>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    async fetch() {
        const store = this.$store
        if (store.getters['emissions/getAggregation']) return

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
        if (!store.getters['emissions/getAggregation']) {
            // Create start and end date for aggregation
            const d = new Date()
            const year = d.getFullYear().toString().padStart(4, '0')
            const month = (d.getMonth() + 1).toString().padStart(2, '0')
            const previousMonth = month - 1
            const day = d.getDate().toString().padStart(2, '0')
            const hour = d.getHours().toString().padStart(2, '0')
            const minute = d.getMinutes().toString().padStart(2, '0')
            const second = d.getSeconds().toString().padStart(2, '0')

            const now = `${year}-${month}-${day} ${hour}:${minute}:${second}`
            const monthAgo = `${year}-${previousMonth}-${day} ${hour}:${minute}:${second}`

            await store.dispatch('emissions/fetchAggregation', {
                domainId: store.getters['domains/getSelectedDomain'].id,
                options: {
                    timeStart: monthAgo,
                    timeEnd: now,
                },
            })
        }
    },
    computed: {
        ...mapGetters({
            getAggregation: 'emissions/getAggregation',
        }),
        amount() {
            if (!this.getAggregation) return 0
            // Convert milligrams to kilograms
            return Math.round(this.getAggregation / 1000000)
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
