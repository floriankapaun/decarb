<template>
    <section>
        <LineChart :data="data" />
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    async fetch() {
        const store = this.$store
        if (store.getters['traffic/getViewsPerDay']) return

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

        // Create start and end date for statistics
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

        // Fetch statistical data
        if (!store.getters['traffic/getViewsPerDay']) {
            await store.dispatch('traffic/fetchViewsPerDay', {
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
            getViewsPerDay: 'traffic/getViewsPerDay',
        }),
        data() {
            const viewsPerDay = this.getViewsPerDay
            if (!viewsPerDay) return {}
            return {
                labels: viewsPerDay.map((x) => x.day.substr(0, 10)),
                datasets: [
                    {
                        label: 'Pageviews',
                        data: viewsPerDay.map((x) => x.pageViews),
                        fill: false,
                        borderColor: '#0C6444',
                        pointRadius: 0, // don't render points
                        pointHoverRadius: 0,
                        tension: 0.1,
                    },
                ],
            }
        },
    },
}
</script>
