import { Router } from 'express';

import domainRoutes from './domainRoutes.js';
import pageViewRoutes from './pageViewRoutes.js';
import subscriptionRoutes from './subscriptionRoutes.js';

export default () => {
    const app = Router();

    domainRoutes(app);
    pageViewRoutes(app);
    subscriptionRoutes(app);

    return app;
};