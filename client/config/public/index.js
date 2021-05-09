import * as enums from './enums.js'
import * as inputs from './inputs.js'

export const API_ENTRYPOINT = process.env.API_ENTRYPOINT || 'xyz'
export const ENUMS = enums
export const INPUT = inputs
export const PROJECT_NAME = 'Eco Web'
export const PROJECT_PREFIX = 'ew'
export const STRIPE_PRICE_ID = {
    [ENUMS.paymentInterval[0]]: process.env.STRIPE_PRICE_ID_MONTHLY,
    [ENUMS.paymentInterval[1]]: process.env.STRIPE_PRICE_ID_YEARLY,
}
export const STRIPE_PRODUCT_ID = process.env.STRIPE_PRODUCT_ID
export const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY
