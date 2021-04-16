import { Router } from 'express';

import domain from './domain.js';

export default () => {
    const app = Router();

    domain(app);

    return app;
};