const jobs = [
    {
        name: 'offset',
        path: './src/jobs/offset.js',
        interval: '3600s',
    },
    {
        name: 'recordEmissionAmout',
        path: './src/jobs/recordEmissionAmount.js',
        interval: '3s',
    },
    {
        name: 'removeUnverifiedUsers',
        path: './src/jobs/removeUnverifiedUsers.js',
        cron: '00 03 * * *', // Every day at 03:00
    },
];

export default jobs;
