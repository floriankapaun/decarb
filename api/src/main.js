import express from 'express';
import cors from 'cors';

import { PORT, API_PREFIX } from './config/index.js';
import routes from './routes/index.js';
import subscribers from './subscribers/index.js';

const app = express();

app.use(express.json())
    .use(cors())
    .use(API_PREFIX, routes());

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
