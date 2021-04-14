import express from 'express';
import cors from 'cors';

import { PORT, API_PREFIX } from './config/index.js';
import router from './router/index.js';

const app = express();

app.use(cors())
    .use(API_PREFIX, router);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})