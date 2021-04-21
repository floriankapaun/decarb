import { PrismaClient } from '@prisma/client';
import { EVENTS } from '../config/index.js';
import EventEmitter from '../utils/eventEmitter.js';

const prisma = new PrismaClient();

class PrismaService {
    async create(modelName, data) {
        const prismaQuery = async () => {
            const newModel = await prisma[modelName].create({
                data: { ...data },
            });
            EventEmitter.emit(EVENTS.create[modelName], newModel);
            return newModel;
        };
        return await this.runPrismaQuery(prismaQuery);
    }

    async createMany(modelName, data) {
        const prismaQuery = async () => {
            const newModels = await prisma[modelName].createMany({
                data,
                skipDuplicates: true,
            })
            EventEmitter.emit(EVENTS.createMany[modelName], newModels);
            return newModels;
        };
        return await this.runPrismaQuery(prismaQuery);
    }

    async update(modelName, id, data, options) {
        const prismaQuery = async () => {
            const updatedModel = await prisma[modelName].update({
                where: { id },
                data: { ...data },
                ...options,
            });
            EventEmitter.emit(EVENTS.update[modelName], updatedModel);
            return updatedModel;
        };
        return await this.runPrismaQuery(prismaQuery);
    }

    async delete(modelName, id) {
        const prismaQuery = async () => {
            const now = new Date();
            const deletedModel = await prisma[modelName].update({
                where: { id },
                data: { deletedAt: now },
            });
            EventEmitter.emit(EVENTS.delete[modelName], deletedModel);
            return deletedModel;
        }
        return await this.runPrismaQuery(prismaQuery);
    }

    async findMany(modelName, options) {
        const prismaQuery = async () => {
            const models = await prisma[modelName].findMany({
                ...options,
            });
            return models;
        };
        return await this.runPrismaQuery(prismaQuery);
    }

    async findUnique(modelName, parameters, options) {
        const prismaQuery = async () => {
            const uniqueModel = await prisma[modelName].findUnique({
                where: { ...parameters },
                ...options,
            });
            return uniqueModel
        };
        return await this.runPrismaQuery(prismaQuery);
    }

    async findFirst(modelName, parameters, options) {
        const prismaQuery = async () => {
            const firstModel = await prisma[modelName].findFirst({
                where: { ...parameters },
                ...options,
            });
            return firstModel;
        };
        return await this.runPrismaQuery(prismaQuery);
    }

    async queryRaw(rawQuery) {
        const prismaQuery = async () => await prisma.$queryRaw(rawQuery);
        return await this.runPrismaQuery(prismaQuery);
    }

    async runPrismaQuery(prismaQuery) {
        try {
            return await prismaQuery();
        } catch(error) {
            console.error(error);
        } finally {
            // FIXME: This line causes errors when there are a lot of requests at the same time
            // Think about a debounce function for it or sth else
            await prisma.$disconnect();
        }
    }
}

export default new PrismaService();
