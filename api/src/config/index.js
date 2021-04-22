import dotenv from 'dotenv';

dotenv.config();

export const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || 15; // expire after 15 m
export const API_PREFIX = process.env.API_PREFIX;
export const ECOLOGI_API_ENTRYPOINT = process.env.ECOLOGI_API_ENTRYPOINT;
export const ECOLOGI_API_KEY = process.env.ECOLOGI_API_KEY;
export const ENUMS = {
    badgeType: ['HORIZONTAL', 'VERTICAL'],
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
};
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const MODE = process.env.MODE || 'development';
export const PLATFORM_EMAIL_HOST = process.env.PLATFORM_EMAIL_HOST;
export const PLATFORM_EMAIL_PASSWORD = process.env.PLATFORM_EMAIL_PASSWORD;
export const PLATFORM_EMAIL_PORT = process.env.PLATFORM_EMAIL_PORT;
export const PLATFORM_EMAIL_SENDER = process.env.PLATFORM_EMAIL_SENDER;
export const PLATFORM_EMAIL_USER = process.env.PLATFORM_EMAIL_USER;
export const PORT = process.env.PORT;
export const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || (60*24*365); // expire after 365 days
