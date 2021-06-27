<template>
    <div class="bar-chart">
        <Doughnut :data="testData" />
    </div>
</template>

<script>
import { Doughnut } from 'vue-chart-3'

export default {
    components: {
        Doughnut,
    },
    data() {
        return {
            testData: {
                labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
                datasets: [
                    {
                        data: [30, 40, 60, 70, 5],
                        backgroundColor: [
                            '#77CEFF',
                            '#0079AF',
                            '#123E6B',
                            '#97B0C4',
                            '#A5C8ED',
                        ],
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
