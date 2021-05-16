const jobs = [
    {
        name: 'purchaseOffsets',
        path: './src/jobs/purchaseOffsets.js',
        cron: '15 03 * * *', // Every day at 03:15
    },
    {
        name: 'recordEmissionAmout',
        path: './src/jobs/recordEmissionAmount.js',
        cron: '45 02 * * *', // Every day at 02:45
    },
    {
        name: 'removeUnverifiedUsers',
        path: './src/jobs/removeUnverifiedUsers.js',
        cron: '30 02 * * *', // Every day at 02:30
    },
];

export default jobs;
