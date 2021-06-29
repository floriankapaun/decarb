import { Router } from 'express';

import BadgeService from '../services/BadgeService.js';

const router = Router();

export default (app) => {
    app.use('/badges', router);

    // Get a badge
    // TODO: Handle AppErrors
    router.get('/:domainId?/:type?/:colorscheme?', (req, res) => {
        let { domainId, type, colorscheme } = req.params;
        const badge = BadgeService.get(type, colorscheme, domainId);
        res.sendFile(badge);
    });
};
