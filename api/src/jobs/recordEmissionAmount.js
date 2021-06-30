import { parentPort } from 'worker_threads';

import EmissionService from '../services/EmissionService.js';
import OffsetService from '../services/OffsetService.js';
import StripeService from '../services/StripeService.js';
import SubscriptionService from '../services/SubscriptionService.js';

(async () => {
    // Get all active Subscriptions
    const activeSubscriptions = await SubscriptionService.getAllActive();
    // For each Subscription
    for (let subscription of activeSubscriptions) {
        const { domainId, stripeSubscriptionItemId } = subscription;
        // Recalculate the current Offset
        const updatedOffset = await OffsetService.recalculateCurrent(domainId, subscription.id);
        console.info('📝 Job "recordEmissionAmount" updated Offset:', updatedOffset);
        // Record emissions to Stripe as 'usage'
        if (updatedOffset.offsetKilograms > 0) {
            await StripeService.recordUsage(
                stripeSubscriptionItemId,
                updatedOffset.offsetKilograms
            );
            console.info(
                `📝 Job "recordEmissionAmount" recorded ${emissionKilograms} kg to Stripe for Subscription "${subscription.id}"`
            );
        }
    }
    if (parentPort) parentPort.postMessage('done');
    else process.exit(0);
})();