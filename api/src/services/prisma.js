import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

class PrismaService {
    async create(modelName, data) {
        const query = async () => {
            const newModel = await prisma[modelName].create({
                data: { ...data },
            });
            return newModel;
        };
        return await this.runQuery(query);
    }

    async findMany(modelName) {
        const query = async () => {
            const models = await prisma[modelName].findMany();
            return models;
        };
        return await this.runQuery(query);
    }

    async findUnique(modelName, id) {
        const query = async () => {
            const uniqueModel = await prisma[modelName].findUnique({
                where: { id },
            });
            return uniqueModel
        };
        return await this.runQuery(query);
    }

    async runQuery(query) {
        try {
            return await query();
        } catch(error) {
            console.error(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default new PrismaService();
