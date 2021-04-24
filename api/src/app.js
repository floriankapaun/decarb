import express from 'express';
import cors from 'cors';

import { PORT, API_PREFIX } from './config/index.js';
import routes from './routes/index.js';
// Importing the subscribers is enough to make them listen
import subscribers from './subscribers/index.js';

export default () => {
    const app = express();

    app.use(express.json())
        .use(cors())
        .use(API_PREFIX, routes());
    
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started listening on http://localhost:${PORT}`);
    });
};
