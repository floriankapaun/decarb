import { PrismaClient } from '@prisma/client';
import { EVENTS, MODE } from '../config/index.js';
import AppError from '../utils/AppError.js';
import EventEmitter from '../utils/eventEmitter.js';

const prisma = new PrismaClient({
    errorFormat: MODE === 'development' ? 'pretty' : 'minimal',
});

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

    /**
     * Runs a prisma Query
     * 
     * Prisma manages a connection pool of database connections. The pool is created when
     * Prisma Client opens the first connection to the database which happens when running
     * the first query, which calls $connect() under the hood.
     * 
     * There is no need to close database connections in this applications use case.
     * 
     * Reference:
     * - https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management
     * - https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-pool
     * 
     * @param {Function} prismaQuery
     * @returns {Promise}
     */
    async runPrismaQuery(prismaQuery) {
        try {
            return await prismaQuery();
        } catch(err) {
            throw new AppError(error);
        }
    }
}

export default new PrismaService();
