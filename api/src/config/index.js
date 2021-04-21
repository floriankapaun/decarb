import dotenv from 'dotenv';

dotenv.config();

export const API_PREFIX = process.env.API_PREFIX;
export const ECOLOGI_API_ENTRYPOINT = process.env.ECOLOGI_API_ENTRYPOINT;
export const ECOLOGI_API_KEY = process.env.ECOLOGI_API_KEY;
export const ENUMS = {
    badgeType: ['HORIZONTAL', 'VERTICAL'],
    badgeColorscheme: ['COLOR', 'COLOR_INVERTED', 'SW', 'SW_INVERTED'],
    offsetType: ['TREE', 'OFFSET'],
    paymentInterval: ['MONTHLY', 'YEARLY'],
    role: ['OWNER', 'MANAGER'],
};
export const EVENTS = {
    create: {
        domain: 'createDomain',
        initialPageIndex: 'createInitialPageIndex',
        page: 'createPage',
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
export const MODE = process.env.MODE || 'development';
export const PORT = process.env.PORT;