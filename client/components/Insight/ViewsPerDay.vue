<template>
    <div class="bar-chart">
        <client-only>
            <BarChart
                :data="barChartData"
                :options="{ maintainAspectRatio: false }"
            />
        </client-only>
    </div>
</template>

<script>
import BarChart from '~/components/bar-chart'
export default {
    components: {
        BarChart,
    },
    data() {
        return {
            barChartData: {
                labels: [100, 50],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [10, 11],
                    },
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [15, 20],
                    },
                ],
            },
        }
    },
}
</script>

<style scoped>
.bar-chart {
    width: 80%;
    height: 80%;
    margin: auto;
    margin-top: 30px;
}
</style>
