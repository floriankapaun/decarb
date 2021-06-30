const jobs = [
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
    // TODO: Implement Job to remove unverified Domains
    // Therefore Upgrade Prisma to get access to the new Cascading logic
    // See: https://github.com/prisma/prisma/releases/tag/2.26.0
];

export default jobs;
