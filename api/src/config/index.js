import dotenv from 'dotenv';

dotenv.config();

// default expire after 15 minutes
export const ACCESS_TOKEN_EXPIRES = parseInt(process.env.ACCESS_TOKEN_EXPIRES) ?? 15;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const API_PREFIX = process.env.API_PREFIX;
export const CLIENT_ENTRYPOINT = process.env.CLIENT_ENTRYPOINT;
export const DAYS_IN_MONTH = 30;
export const DAYS_IN_YEAR = 365;
export const DOMAIN_PAGES_RESPONSE_LIMIT = 500;
export const ECOLOGI_API_ENTRYPOINT = process.env.ECOLOGI_API_ENTRYPOINT;
export const ECOLOGI_API_KEY = process.env.ECOLOGI_API_KEY;
export const ECOLOGI_DEFAULT_UNIT = 'KG';
export const ECOLOGI_CENTS_PER_KG_OFFSET = 0.44;
export const ENUMS = {
    badgeType: ['DEFAULT'],
    badgeColorscheme: ['COLOR', 'COLOR_INVERTED', 'SW', 'SW_INVERTED'],
    connectionType: ['DEFAULT', 'WIFI', '3G', 'LTE'],
    deviceType: ['DEFAULT', 'SMARTPHONE', 'TABLET', 'LAPTOP', 'DESKTOP'],
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
export const MAX_INITIAL_CALCULATIONS = 50;
export const MAX_NUMBER_OF_WORKERS = process.env.MAX_NUMBER_OF_WORKERS ?? 4;
export const MODE = process.env.MODE ?? 'development';
export const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY;
export const PAGESPEED_STRATEGY = 'mobile';
export const PING_SCRIPT_URL = process.env.PING_SCRIPT_URL;
export const PLATFORM_EMAIL_HOST = process.env.PLATFORM_EMAIL_HOST;
export const PLATFORM_EMAIL_PASSWORD = process.env.PLATFORM_EMAIL_PASSWORD;
export const PLATFORM_EMAIL_PORT = process.env.PLATFORM_EMAIL_PORT;
export const PLATFORM_EMAIL_SENDER = process.env.PLATFORM_EMAIL_SENDER;
export const PLATFORM_EMAIL_USER = process.env.PLATFORM_EMAIL_USER;
export const PORT = process.env.PORT;
export const PROJECT_NAME = 'decarb';
export const PROJECT_SLUG = PROJECT_NAME;
// default expire after 1 day
export const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES ?? (60*24*1);
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


/**
 * Emission Calculation Variables
 */

// Source: https://httparchive.org/reports/state-of-the-web
export const DEFAULT_AVERAGE_BYTES = 2000000;

// Source: https://www.flightpedia.org/convert/1073741274-bytes-to-gigabytes.html
export const BYTE_IN_GB = 1073741274;

// Source: Website Carbon Calcuator
// https://gitlab.com/wholegrain/carbon-api-2-0/-/blob/master/includes/carbonapi.php#L10
export const PERCENTAGE_OF_DATA_LOADED_CACHED = 0.02;

// Source: "On global electricity usage of communication technology: trends to 2030"
// Page: 142
// Note: Used mean value of the forecast for 2020
// https://www.mdpi.com/2078-1547/6/1/117
export const WIFI_WH_PER_GB = 120;

// Source: "A Close Examination of Performance and Power Characteristics of 4G 
// LTE Networks" Page 236
// https://doi.org/10.1145/2307636.2307658
export const ENERGY_EFFICIENCY = {
    [ENUMS.connectionType[0]]: 1, // DEFAULT
    [ENUMS.connectionType[1]]: 1, // WIFI
    [ENUMS.connectionType[2]]: 6.65, // 3G
    [ENUMS.connectionType[3]]: 8.7, // LTE
}

// Note: Fits pretty good with the forecasted values in "On global electricity usage
// of communication technology: trends to 2030"
export const WH_PER_GB = {
    [ENUMS.connectionType[0]]: WIFI_WH_PER_GB, // DEFAULT
    [ENUMS.connectionType[1]]: WIFI_WH_PER_GB, // WIFI
    [ENUMS.connectionType[2]]: WIFI_WH_PER_GB * ENERGY_EFFICIENCY[ENUMS.connectionType[2]], // 3G
    [ENUMS.connectionType[3]]: WIFI_WH_PER_GB * ENERGY_EFFICIENCY[ENUMS.connectionType[3]], // LTE
}

// Source: Website Carbon Calculator
// https://gitlab.com/wholegrain/carbon-api-2-0/-/blob/master/includes/carbonapi.php#L12
export const CO2E_PER_WH_GREEN = 0.0334;

// Source: "IEA Global Energy & CO2 Status Report 2018" Page 9
// https://iea.blob.core.windows.net/assets/23f9eb39-7493-4722-aced-61433cbffe10/Global_Energy_and_CO2_Status_Report_2018.pdf
// Note: "grey" does not mean its only power generated by fossil fuels but that its
// an average of the global power usage including fossil fuel generated electricity.
export const CO2E_PER_WH_GREY = 0.475;

// Source: Website Carbon Calcuator
// https://gitlab.com/wholegrain/carbon-api-2-0/-/blob/master/includes/carbonapi.php#L13
export const PERCENTAGE_OF_ENERGY_IN_DATACENTER = 0.1008;
export const PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER = (1 - PERCENTAGE_OF_ENERGY_IN_DATACENTER);

// Source: Contentsquare 2020 Digital Experience Benchmark Report
// https://go.contentsquare.com/hubfs/eBooks/2020%20Digital%20Experience%20Benchmark/2020%20Digital%20Experience%20Benchmark%20Report%20PDF%20English.pdf?hsLang=en
export const AVERAGE_SECONDS_ON_PAGE = 62;

// Sources:
// https://www.energuide.be/en/questions-answers/how-much-power-does-a-computer-use-and-how-much-co2-does-that-represent/54/
// https://www.it.northwestern.edu/hardware/eco/stats.html
// https://iswitch.com.sg/how-much-electricity-computer-consume/
// https://www.daftlogic.com/information-appliance-power-consumption.htm
// https://www.caruna.fi/en/our-services/energy-efficiency/average-consumption-of-electrical-devices
// https://www.comparethemarket.com.au/energy/guides/guide-to-technology-energy-consumption/
// https://www.123energie.de/privatkunden/magazin/wie-viel-energie-verbraucht-ein-smartphone_a37
// https://www.verivox.de/strom/nachrichten/smartphone-taeglich-aufladen-so-viel-kostet-es-wirklich-121625/
// Note: Used a lot of sources to get average values that are plausible
export const USAGE_WH = {
    [ENUMS.deviceType[0]]: 0.063, // DEFAULT (Average value)
    [ENUMS.deviceType[1]]: 0.0015, // SMARTPHONE
    [ENUMS.deviceType[2]]: 0.015, // TABLET
    [ENUMS.deviceType[3]]: 0.04625, // LAPTOP
    [ENUMS.deviceType[4]]: 0.190, // DESKTOP
};
