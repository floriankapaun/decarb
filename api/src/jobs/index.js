const jobs = [
    {
        name: 'remove-unverified-users',
        interval: '1h',
        timeout: 0
    },
    {
        name: 'offset',
        path: './src/jobs/offset.js',
        cron: '2s'
    },
];

export default jobs;
