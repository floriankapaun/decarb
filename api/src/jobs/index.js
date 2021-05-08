const jobs = [
    {
        name: 'remove-unverified-users',
        path: './src/jobs/remove-unverified-users.js',
        cron: '00 03 * * *', // Every day at 03:00
    },
    {
        name: 'offset',
        path: './src/jobs/offset.js',
        interval: '3600s'
    },
];

export default jobs;
