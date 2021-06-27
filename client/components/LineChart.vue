<template>
    <client-only>
        <canvas ref="lineChart"></canvas>
    </client-only>
</template>

<script>
import Chart from 'chart.js'

export default {
    props: {
        data: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    data() {
        return {
            lineChart: undefined,
        }
    },
    computed: {
        chartConfig() {
            return {
                type: 'line',
                data: this.data,
                options: {
                    aspectRatio: 2,
                    interaction: {
                        intersect: false,
                        mode: 'nearest',
                    },
                    plugins: {
                        legend: { display: false },
                    },
                    responsive: true,
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                                callback: (val, index) => {
                                    // Show only every 5th label
                                    return index % 5 === 0
                                        ? this.getLabelForValue(val)
                                        : null
                                },
                            },
                        },
                    },
                },
            }
        },
    },
    watch: {
        // If the data prop changes, update the chart
        data: {
            deep: true,
            handler() {
                this.resetChart()
            },
        },
    },
    mounted() {
        // Have to wait for next tick until DOM is available
        this.$nextTick(() => {
            this.lineChart = new Chart(this.$refs.lineChart, this.chartConfig)
        })
    },
    methods: {
        getLabelForValue(val) {
            return this.data.labels[val]
        },
        resetChart() {
            const newConfig = this.chartConfig
            this.lineChart.data = newConfig.data
            this.lineChart.update()
        },
    },
}
</script>