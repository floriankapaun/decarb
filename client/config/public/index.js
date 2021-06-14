import * as enums from './enums.js'
import * as inputs from './inputs.js'

export const API_ENTRYPOINT =
    process.env.API_ENTRYPOINT || 'http://localhost:4000/api/v1'
export const CLIENT_ENTRYPOINT =
    process.env.CLIENT_ENTRYPOINT || 'http://localhost:3000'
export const ENUMS = enums
export const INPUT = inputs
export const PROJECT_NAME = 'DECARB'
export const PROJECT_PREFIX = 'dcrb'
export const STRIPE_PRICE_ID = {
    [ENUMS.paymentInterval[0]]: process.env.STRIPE_PRICE_ID_MONTHLY,
    [ENUMS.paymentInterval[1]]: process.env.STRIPE_PRICE_ID_YEARLY,
}
export const STRIPE_PRODUCT_ID = process.env.STRIPE_PRODUCT_ID
export const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY
export const VUEX_PERSISTANCE_KEY = `_${PROJECT_NAME}`
