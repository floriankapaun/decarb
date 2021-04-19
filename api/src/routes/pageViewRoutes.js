import { Router } from 'express';

import PrismaService from '../services/PrismaService';

const router = Router();

export default (app) => {
    app.use('/pageviews', router);

    // Register a pageView
    router.post('/', async (req, res) => {
        // FIXME: Verify origin! Currently everybody could send requests to create pageViews
        // req.headers.origin
        // TODO: Probably move most of this into a Service
        const origin = req.body.p;
        // const referrer = req.body.r;
        // const windowWidth = req.body.w;
        // const loadingTime = req.body.t;
        const page = await PrismaService.findUnique('page', { url: origin });
        const options = { orderBy: { createdAt: 'desc' } };
        const pageViewEmission = await PrismaService.findFirst('pageViewEmission', { pageId: page.id }, options);
        const pageViewData = {
            pageId: page.id,
            pageViewEmissionId: pageViewEmission.id,
        };
        const newPageView = await PrismaService.create('pageView', pageViewData);
        res.json(newPageView).status(200);
    });
}