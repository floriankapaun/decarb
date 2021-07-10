import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import { EVENTS, MODE } from '../config/index.js';
import EventEmitter from '../utils/eventEmitter.js';

const prisma = new PrismaClient({
    errorFormat: MODE === 'development' ? 'pretty' : 'minimal',
});


/**
 * Handles Database Queries
 */
class PrismaService {


    /**
     * Creates a new Database Entry and emits an Event
     * for type `modelName`
     * 
     * @param {String} modelName - Prisma Model Name
     * @param {Object} data
     * @returns {Object} - Created Model
     */
    async create(modelName, data) {
        const newModel = await prisma[modelName].create({
            data: { ...data },
        });
        EventEmitter.emit(EVENTS.create[modelName], newModel);
        return newModel;
    }


    /**
     * Creates multiple new Database Entries and emits an Event
     * for type `modelName`
     * 
     * @param {String} modelName - Prisma Model Name
     * @param {Array} data
     * @returns {Number} - Number of created Models
     */
    async createMany(modelName, data) {
        const newModels = await prisma[modelName].createMany({
            data,
            skipDuplicates: true,
        })
        EventEmitter.emit(EVENTS.createMany[modelName], newModels);
        return newModels;
    }


    /**
     * Updates a database Entry
     * 
     * @param {String} modelName - Prisma Model Name
     * @param {String} id - Model ID to update
     * @param {Object} data 
     * @param {Object} options 
     * @returns {Object} - Updated Model
     */
    async update(modelName, id, data, options) {
        const updatedModel = await prisma[modelName].update({
            where: { id },
            data: { ...data },
            ...options,
        });
        EventEmitter.emit(EVENTS.update[modelName], updatedModel);
        return updatedModel;
    }


    /**
     * Does not actually delete something from the Database, but
     * adds a timestamp do `deletedAt`.
     * 
     * @param {String} modelName - Prisma Model Name
     * @param {String} id - Model ID to delete
     * @returns {Object} - Updated Model
     */
    async delete(modelName, id) {
        const now = new Date();
        const deletedModel = await prisma[modelName].update({
            where: { id },
            data: { deletedAt: now },
        });
        EventEmitter.emit(EVENTS.delete[modelName], deletedModel);
        return deletedModel;
    }


    /**
     * Actually really deletes something from the Database.
     * Be cautious with this one!
     * 
     * @param {String} modelName - Prisma Model Name
     * @param {String} id - Model ID to delete
     * @returns {Object}
     */
    async reallyDeleteMany(modelName, parameters) {
        const deletedModels = await prisma[modelName].deleteMany({
            ...parameters,
        })
        return deletedModels;
    }


    /**
     * Find a Model by a unique Identifier
     * 
     * @param {String} modelName - Prisma Model Name
     * @param {Object} parameters - Parameters to filter by
     * @param {Object} options - Further query options
     * @returns {Object} - Found Model
     */
    async findUnique(modelName, parameters, options) {
        const uniqueModel = await prisma[modelName].findUnique({
            where: { ...parameters },
            ...options,
        });
        return uniqueModel;
    }


    /**
     * Find the first Model by some filter parameters and options
     * 
     * @param {String} modelName - Prisma Model Name
     * @param {Object} parameters - Parameters to filter by
     * @param {Object} options - Further query options
     * @returns {Object} - Found Model
     */
    async findFirst(modelName, parameters, options) {
        const firstModel = await prisma[modelName].findFirst({
            where: { ...parameters },
            ...options,
        });
        return firstModel;
    }


    /**
     * Find all Models that fit the filter parameters
     * 
     * @param {String} modelName - Prisma Model Name
     * @param {Object} parameters - Parameters to filter by
     * @returns {Array} - Found Models
     */
    async findMany(modelName, parameters) {
        const models = await prisma[modelName].findMany({
            ...parameters,
        });
        return models;
    }


    /**
     * Count records, aggregate number fields or select distinct field values.
     * 
     * API Reference: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference/#aggregate
     * 
     * @param {String} modelName - name of prisma model (lowercase, singular)
     * @param {Object} parameters - query parameters
     * @returns {Object} - query result
     */
    async aggregate(modelName, parameters) {
        const aggregation = await prisma[modelName].aggregate({
            ...parameters
        });
        return aggregation;
    }


    /**
     * Run raw SQL Queries
     * 
     * @param {String} rawQuery 
     * @returns {Object} - Database Response
     */
    async queryRaw(rawQuery) {
        return await prisma.$queryRaw(rawQuery);
    }
}

export default new PrismaService();
