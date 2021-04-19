import { Router } from 'express';

import domainRoutes from './domainRoutes.js';
import pageViewRoutes from './pageViewRoutes.js';

export default () => {
    const app = Router();

    domainRoutes(app);
    pageViewRoutes(app);

    return app;
};