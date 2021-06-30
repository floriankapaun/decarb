import * as enums from './enums.js'
import * as inputs from './inputs.js'

export const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:4000'
export const API_PREFIX = process.env.API_PREFIX ?? '/api/v1'
export const API_ENTRYPOINT = API_BASE_URL + API_PREFIX
export const PUBLIC_CLIENT_ENTRYPOINT =
    process.env.PUBLIC_CLIENT_ENTRYPOINT ?? 'http://localhost:3000'
export const ENUMS = enums
// Is higher than ECOLOGI_CENTS_PER_KG_CO2E on the API side because of added profit margin and vat
export const STRIPE_CENTS_PER_KG_CO2E =
    process.env.STRIPE_CENTS_PER_KG_CO2E ?? 6
export const INPUT = inputs
export const PING_SCRIPT_URL =
    process.env.PING_SCRIPT_URL ?? 'https://ping.decarb.website/ping.min.js'
export const PROJECT_NAME = 'DECARB'
export const PROJECT_PREFIX = 'dcrb'
export const STRIPE_PRICE_ID = {
    [ENUMS.paymentInterval[0]]: process.env.STRIPE_PRICE_ID_MONTHLY,
    [ENUMS.paymentInterval[1]]: process.env.STRIPE_PRICE_ID_YEARLY,
}
export const STRIPE_PRODUCT_ID = process.env.STRIPE_PRODUCT_ID
export const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY
export const VUEX_PERSISTANCE_KEY = `_${PROJECT_NAME}`
