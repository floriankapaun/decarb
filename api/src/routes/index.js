import { Router } from 'express';

import authRoutes from './authRoutes.js';
import domainRoutes from './domainRoutes.js';
import pageViewRoutes from './pageViewRoutes.js';
import sandboxRoutes from './sandboxRoutes.js';
import subscriptionRoutes from './subscriptionRoutes.js';
import userRoutes from './userRoutes.js';

export default () => {
    const app = Router();

    authRoutes(app);
    domainRoutes(app);
    pageViewRoutes(app);
    sandboxRoutes(app);
    subscriptionRoutes(app);
    userRoutes(app);

    return app;
};