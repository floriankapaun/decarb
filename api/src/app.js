import express from 'express';
import cors from 'cors';

import { PORT, API_PREFIX } from './config/index.js';
import routes from './routes/index.js';
// Importing the subscribers is enough to make them listen
import subscribers from './subscribers/index.js';
// The same goes for bree, our job scheduler
import bree from './bree.js';

export default () => {
    const app = express();

    app.use(express.json())
        .use(cors())
        // Routes must be defined last, to make sure the error handler (defined inside)
        // is included in the last use() call.
        .use(API_PREFIX, routes());
    
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started listening on http://localhost:${PORT}`);
    });
};
