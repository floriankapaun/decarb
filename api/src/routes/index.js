import { Router } from 'express';

import domainRoutes from './domainRoutes.js';
import pageViewRoutes from './pageViewRoutes.js';
import sandboxRoutes from './sandboxRoutes.js';
import subscriptionRoutes from './subscriptionRoutes.js';

export default () => {
    const app = Router();

    domainRoutes(app);
    pageViewRoutes(app);
    sandboxRoutes(app);
    subscriptionRoutes(app);

    return app;
};