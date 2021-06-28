import { parentPort } from 'worker_threads';

import EmissionService from '../services/EmissionService.js';
import OffsetService from '../services/OffsetService.js';
import PrismaService from '../services/PrismaService.js';
import StripeService from '../services/StripeService.js';
import SubscriptionService from '../services/SubscriptionService.js';

(async () => {
    const now = new Date();
    // Get all active Subscriptions
    const activeSubscriptions = await SubscriptionService.getAllActive();
    // For each Subscription
    for (let subscription of activeSubscriptions) {
        const { domainId, recordedUntil, stripeSubscriptionItemId } = subscription;
        // Get amount of Emissions created since last record
        const emissionKilograms = await EmissionService.getEmissionKilograms(domainId, recordedUntil, now);
        // Record Emissions to Stripe as 'usage'
        if (emissionKilograms > 0) {
            await StripeService.recordUsage(stripeSubscriptionItemId, emissionKilograms);
            console.log(`📝 Job "recordEmissionAmount" recorded ${emissionKilograms} additional kilograms to Stripe for Subscription "${subscription.id}"`);
        }
        // Get the current Offset Entry from Database
        const currentOffset = await OffsetService.getCurrent(subscription.id, now);
        // Add the recorded usage (emissionKilograms) to the current offset
        const updatedOffset = await OffsetService.recordOffsetKilograms(
            currentOffset.id,
            emissionKilograms,
            now
        );
        console.log('📝 Job "recordEmissionAmount" updated Offset:', updatedOffset);
        const updatedSubscription = await PrismaService.update(
            'subscription',
            subscription.id,
            { recordedUntil: now }
        );
        console.log('📝 Job "recordEmissionAmount" updated Subscription:', updatedSubscription);
    }
    if (parentPort) parentPort.postMessage('done');
    else process.exit(0);
})();