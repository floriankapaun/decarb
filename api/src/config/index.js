import dotenv from 'dotenv';

dotenv.config();

// TODO: Refactor Emission Calculation Variables based on research

export const ACCESS_TOKEN_EXPIRES = parseInt(process.env.ACCESS_TOKEN_EXPIRES) || 15; // expire after 15 m
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const API_PREFIX = process.env.API_PREFIX;
export const BYTE_IN_GB = 1073741274; // GB to Byte (https://www.flightpedia.org/convert/1073741274-bytes-to-gigabytes.html)
export const CLIENT_ENTRYPOINT = process.env.CLIENT_ENTRYPOINT;
export const CO2E_PER_WH_GREEN = 0.0334; // Source: Website Carbon Calculator
export const CO2E_PER_WH_GREY = 0.475; // Source: Website Carbon Calculator
export const DAYS_IN_MONTH = 30;
export const DAYS_IN_YEAR = 365;
export const DOMAIN_PAGES_RESPONSE_LIMIT = 500;
export const ECOLOGI_API_ENTRYPOINT = process.env.ECOLOGI_API_ENTRYPOINT;
export const ECOLOGI_API_KEY = process.env.ECOLOGI_API_KEY;
export const ECOLOGI_DEFAULT_UNIT = 'KG';
export const ENUMS = {
    badgeType: ['DEFAULT'],
    badgeColorscheme: ['COLOR', 'COLOR_INVERTED', 'SW', 'SW_INVERTED'],
    currency: ['EUR', 'USD', 'GBP', 'AUD', 'CAD'],
    offsetType: ['CARBON_OFFSET'],
    paymentInterval: ['MONTHLY', 'YEARLY'],
    purchaseStatus: ['PENDING', 'SUCCESSFULL', 'FAILED'],
    role: ['OWNER', 'MANAGER'],
};
export const EVENTS = {
    create: {
        domain: 'createDomain',
        initialPageIndex: 'createInitialPageIndex',
        offset: 'createOffset',
        page: 'createPage',
        user: 'createUser',
    },
    createMany: {
        page: 'createManyPages',
    },
    update: {
        domain: 'updateDomain',
    },
    delete: {
        domain: 'deleteDomain',
    },
    start: {
        subscription: 'startSubscription',
    },
};
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const MAX_NUMBER_OF_WORKERS = process.env.MAX_NUMBER_OF_WORKERS || 4;
export const MODE = process.env.MODE || 'development';
export const PERCENTAGE_OF_DATA_LOADED_CACHED = 0.02; // Source: Website Carbon Calcuator
export const PERCENTAGE_OF_ENERGY_IN_DATACENTER = 0.1008; // Source: Website Carbon Calcuator
export const PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER = (1 - PERCENTAGE_OF_ENERGY_IN_DATACENTER); // Source: Website Carbon Calcuator
export const PING_SCRIPT_URL = process.env.PING_SCRIPT_URL;
export const PLATFORM_EMAIL_HOST = process.env.PLATFORM_EMAIL_HOST;
export const PLATFORM_EMAIL_PASSWORD = process.env.PLATFORM_EMAIL_PASSWORD;
export const PLATFORM_EMAIL_PORT = process.env.PLATFORM_EMAIL_PORT;
export const PLATFORM_EMAIL_SENDER = process.env.PLATFORM_EMAIL_SENDER;
export const PLATFORM_EMAIL_USER = process.env.PLATFORM_EMAIL_USER;
export const PORT = process.env.PORT;
export const PROJECT_SLUG = 'decarb';
export const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || (60*24*365); // expire after 365 days
export const STRIPE_CANCEL_URL = process.env.STRIPE_CANCEL_URL;
export const STRIPE_CHECKOUT_SESSION_MODE = 'subscription';
// https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-payment_method_types
export const STRIPE_PAYMENT_METHODS = ['card'];
export const STRIPE_PORTAL_RETURN_URL = process.env.STRIPE_PORTAL_RETURN_URL;
export const STRIPE_PRICE_ID = {
    [ENUMS.paymentInterval[0]]: process.env.STRIPE_PRICE_ID_MONTHLY,
    [ENUMS.paymentInterval[1]]: process.env.STRIPE_PRICE_ID_YEARLY,
};
export const STRIPE_PRODUCT_ID = process.env.STRIPE_PRODUCT_ID;
export const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const STRIPE_SUCCESS_URL = process.env.STRIPE_SUCCESS_URL;
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
export const WH_PER_GB = 1805; // Article suggests its 15 (https://www.datacenterknowledge.com/energy/how-much-netflix-really-contributing-climate-change)
