import { parentPort } from 'worker_threads';

import EmissionService from '../services/EmissionService.js';
import OffsetService from '../services/OffsetService.js';
import StripeService from '../services/StripeService.js';
import SubscriptionService from '../services/SubscriptionService.js';

(async () => {
    const now = new Date();
    // Get all active Subscriptions
    const activeSubscriptions = await SubscriptionService.getAllActive();
    // For each Subscription
    for (let subscription of activeSubscriptions) {
        const { domainId, stripeSubscriptionItemId } = subscription;
        // Get current Offset
        const currentOffset = await OffsetService.getCurrent(subscription.id, now);
        // Get amount of emissions created during Offset period
        const emissionKilograms = await EmissionService.getAggregatedEmissions(
            domainId,
            currentOffset.from,
            now
        );
        // Record emissions to Stripe as 'usage'
        if (emissionKilograms > 0) {
            await StripeService.recordUsage(stripeSubscriptionItemId, emissionKilograms);
            console.info(
                `📝 Job "recordEmissionAmount" recorded ${emissionKilograms} kg to Stripe for Subscription "${subscription.id}"`
            );
        }
        // Add the recorded usage (emissionKilograms) to the current offset
        const updatedOffset = await OffsetService.recordOffsetKilograms(
            currentOffset.id,
            emissionKilograms
        );
        console.info('📝 Job "recordEmissionAmount" updated Offset:', updatedOffset);
    }
    if (parentPort) parentPort.postMessage('done');
    else process.exit(0);
})();