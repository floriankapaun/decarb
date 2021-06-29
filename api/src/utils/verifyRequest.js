import { API_PREFIX } from '../config/index.js';

/**
 * Adds a raw Body to the request object if on Stripe Webhook route.
 * 
 * Implemented to make the Stripe Signature Verification work.
 * 
 * Reference: https://github.com/stripe/stripe-node/issues/341#issuecomment-304733080
 */
export default (req, res, buf) => {
    // Save the raw Body for signature validation if the Stripe Webhook route is hit
    if (req.originalUrl.startsWith(`${API_PREFIX}/stripe/webhooks`)) {
        req.rawBody = buf.toString();
    }
};
