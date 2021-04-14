import { PrismaClient } from '@prisma/client'
import express from 'express';

import { indexController } from '../controller/index.js';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', indexController);

export default router;
