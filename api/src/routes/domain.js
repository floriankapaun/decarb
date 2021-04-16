import { Router } from 'express';
import prisma from '../services/prisma';

const router = Router();

export default (app, prisma) => {
    app.use('/domains', router);

    router.get('/', async (req, res) => {
        try {
            const domains = await prisma.domain.findMany();
            return res.json(domains).status(200);
        }
        catch (e) {
            console.error(e);
            // return next(e);
        }
        finally {
            return await prisma.$disconnect();
        }
    });

    router.post('/', async (req, res) => {
        try {
            const newDomain = await prisma.domain.create({
                data: { ...req.body },
            });
            return res.json(newDomain).status(200);
        }
        catch (e) {
            console.error(e);
            // return next(e);
        }
        finally {
            return await prisma.$disconnect();
        }
    });

    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        const domain = await prisma.domain.findUnique({
            where: { id },
        });
        res.json(domain).status(200);
    });
};
