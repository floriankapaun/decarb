import { Router } from 'express';
import cors from 'cors';

import BadgeService from '../services/BadgeService.js';

const router = Router();

export default (app) => {
    app.use('/badges', router);

    // Get a badge
    router.get(
        '/:domainId?/:type?/:colorscheme?',
        cors(),
        (req, res) => {
            let { domainId, type, colorscheme } = req.params;
            const badge = BadgeService.get(type, colorscheme, domainId);
            res.sendFile(badge, (error) => {
                if (error) {
                    // No further handling needed because this shouldn't happen anyways
                    console.error(error);
                    res.status(error.status).end();
                }
            });
        }
    );
};
