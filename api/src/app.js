import express from 'express';
import cors from 'cors';

import { PORT, API_PREFIX, CLIENT_ENTRYPOINT } from './config/index.js';
import routes from './routes/index.js';
import verifyRequest from './utils/verifyRequest.js';
// Importing the subscribers is enough to make them listen
import subscribers from './subscribers/index.js';
// The same goes for bree, our job scheduler
import bree from './bree.js';

export default () => {
    const app = express();

    app.use(express.json({ verify: verifyRequest }))
        // Allow global CORS for Client
        .use(cors({
            origin: CLIENT_ENTRYPOINT,
            credentials: true,
        }))
        // Routes must be defined last, to make sure the error handler (defined inside)
        // is included in the last use() call.
        .use(API_PREFIX, routes());
    
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started listening on http://localhost:${PORT}`);
    });
};
