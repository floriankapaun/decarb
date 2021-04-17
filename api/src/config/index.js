import dotenv from 'dotenv';

dotenv.config();

export const API_PREFIX = process.env.API_PREFIX;
export const EVENTS = {
    create: {
        domain: 'createDomain',
        page: 'createPage',
    },
    update: {
        domain: 'updateDomain',
    },
    delete: {
        domain: 'deleteDomain',
    },
};
export const PORT = process.env.PORT;