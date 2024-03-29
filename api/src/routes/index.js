import { Router } from 'express';

import authRoutes from './authRoutes.js';
import badgeRoutes from './badgeRoutes.js';
import domainRoutes from './domainRoutes.js';
import pageViewRoutes from './pageViewRoutes.js';
import sandboxRoutes from './sandboxRoutes.js';
import stripeRoutes from './stripeRoutes.js';
import subscriptionRoutes from './subscriptionRoutes.js';
import userRoutes from './userRoutes.js';

import error from '../middlewares/error.js';
import { MODE } from '../config/index.js';

export default () => {
    const app = Router();

    authRoutes(app);
    badgeRoutes(app);
    domainRoutes(app);
    pageViewRoutes(app);
    subscriptionRoutes(app);
    stripeRoutes(app);
    userRoutes(app);
    
    // Only enable sanbox routes in development
    if (MODE === 'development') sandboxRoutes(app);
    
    // Error handler must be defined last
    app.use(error)

    return app;
};
