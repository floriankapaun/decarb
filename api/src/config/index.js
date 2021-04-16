import dotenv from 'dotenv';

dotenv.config();

export const API_PREFIX = process.env.API_PREFIX;
export const EVENTS = {
    CREATE: {
        DOMAIN: 'createDomain',
    },
};
export const PORT = process.env.PORT;