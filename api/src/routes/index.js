import { Router } from 'express';
import { PrismaClient } from '@prisma/client'

import domain from './domain.js';

export default () => {
    const app = Router();
    const prisma = new PrismaClient()

    domain(app, prisma);

    return app;
};