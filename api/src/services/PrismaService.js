import { PrismaClient } from '@prisma/client';

import { EVENTS, MODE } from '../config/index.js';
import EventEmitter from '../utils/eventEmitter.js';

const prisma = new PrismaClient({
    errorFormat: MODE === 'development' ? 'pretty' : 'minimal',
});

class PrismaService {
    async create(modelName, data) {
        const newModel = await prisma[modelName].create({
            data: { ...data },
        });
        EventEmitter.emit(EVENTS.create[modelName], newModel);
        return newModel;
    }

    async createMany(modelName, data) {
        const newModels = await prisma[modelName].createMany({
            data,
            skipDuplicates: true,
        })
        EventEmitter.emit(EVENTS.createMany[modelName], newModels);
        return newModels;
    }

    async update(modelName, id, data, options) {
        const updatedModel = await prisma[modelName].update({
            where: { id },
            data: { ...data },
            ...options,
        });
        EventEmitter.emit(EVENTS.update[modelName], updatedModel);
        return updatedModel;
    }

    async delete(modelName, id) {
        const now = new Date();
        const deletedModel = await prisma[modelName].update({
            where: { id },
            data: { deletedAt: now },
        });
        EventEmitter.emit(EVENTS.delete[modelName], deletedModel);
        return deletedModel;
    }

    async reallyDeleteMany(modelName, params) {
        const deletedModels = await prisma[modelName].deleteMany({
            ...params,
        })
        return deletedModels;
    }

    async findMany(modelName, options) {
        const models = await prisma[modelName].findMany({
            ...options,
        });
        return models;
    }

    async findUnique(modelName, parameters, options) {
        const uniqueModel = await prisma[modelName].findUnique({
            where: { ...parameters },
            ...options,
        });
        return uniqueModel;
    }

    async findFirst(modelName, parameters, options) {
        const firstModel = await prisma[modelName].findFirst({
            where: { ...parameters },
            ...options,
        });
        return firstModel;
    }

    async queryRaw(rawQuery) {
        return await prisma.$queryRaw(rawQuery);
    }
}

export default new PrismaService();
