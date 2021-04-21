import { PrismaClient } from '@prisma/client';
import { EVENTS } from '../config/index.js';
import EventEmitter from '../utils/eventEmitter.js';

const prisma = new PrismaClient();

class PrismaService {
    async create(modelName, data) {
        const query = async () => {
            const newModel = await prisma[modelName].create({
                data: { ...data },
            });
            EventEmitter.emit(EVENTS.create[modelName], newModel);
            return newModel;
        };
        return await this.runQuery(query);
    }

    async createMany(modelName, data) {
        const query = async () => {
            const newModels = await prisma[modelName].createMany({
                data,
                skipDuplicates: true,
            })
            EventEmitter.emit(EVENTS.createMany[modelName], newModels);
            return newModels;
        };
        return await this.runQuery(query);
    }

    async update(modelName, id, data, options) {
        const query = async () => {
            const updatedModel = await prisma[modelName].update({
                where: { id },
                data: { ...data },
                ...options,
            });
            EventEmitter.emit(EVENTS.update[modelName], updatedModel);
            return updatedModel;
        };
        return await this.runQuery(query);
    }

    async delete(modelName, id) {
        const query = async () => {
            const now = new Date();
            const deletedModel = await prisma[modelName].update({
                where: { id },
                data: { deletedAt: now },
            });
            EventEmitter.emit(EVENTS.delete[modelName], deletedModel);
            return deletedModel;
        }
        return await this.runQuery(query);
    }

    async findMany(modelName, options) {
        const query = async () => {
            const models = await prisma[modelName].findMany({
                ...options,
            });
            return models;
        };
        return await this.runQuery(query);
    }

    async findUnique(modelName, parameters, options) {
        const query = async () => {
            const uniqueModel = await prisma[modelName].findUnique({
                where: { ...parameters },
                ...options,
            });
            return uniqueModel
        };
        return await this.runQuery(query);
    }

    async findFirst(modelName, parameters, options) {
        const query = async () => {
            const firstModel = await prisma[modelName].findFirst({
                where: { ...parameters },
                ...options,
            });
            return firstModel;
        };
        return await this.runQuery(query);
    }

    async aggregateDomainEmissions(domainId, start, end) {
        const query = async () => {
            const domainEmissions = await prisma.$queryRaw(`
                SELECT
                    SUM(page_view_emissions.emission_amount) AS "domain_emissions"
                FROM
                    domains
                    JOIN pages ON domains.id = pages.domain_id
                    JOIN page_views ON pages.id = page_views.page_id
                    JOIN page_view_emissions ON page_view_emissions.id = page_views.page_view_emission_id
                WHERE
                    domains.id = '${domainId}'
                    AND page_views.created_at >= TO_DATE('${start}', 'YYYY-MM-DD')
                    AND page_views.created_at <= TO_DATE('${end}', 'YYYY-MM-DD')
            `);
            return domainEmissions[0].domain_emissions;
        };
        return await this.runQuery(query);
    }

    async runQuery(query) {
        try {
            return await query();
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
