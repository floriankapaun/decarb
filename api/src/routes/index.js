import { Router } from 'express';

import domain from './domainRoutes.js';

export default () => {
    const app = Router();

    domain(app);

    return app;
};