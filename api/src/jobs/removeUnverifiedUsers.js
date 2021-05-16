import { parentPort } from 'worker_threads';

import PrismaService from '../services/PrismaService.js';
import { addDaysToDate } from '../utils/date.js';


/**
 * Delete all users that were created 24 hours ago and aren't verified yet
 */
(async () => {
    const oneDayAgo = addDaysToDate(new Date(), -1)
    const deletedUsers = await PrismaService.reallyDeleteMany('user', {
        where: {
            createdAt: { lt: oneDayAgo },
            verifiedAt: null,
        }
    });
    console.log('📝 Job "removeUnverifiedUsers" deleted:', deletedUsers);
    if (parentPort) parentPort.postMessage('done');
    else process.exit(0);
})();