const { PrismaClient } = require('@prisma/client')

const users = require('./seed-data/users.js')
const domains = require('./seed-data/domains.js')
const domainHostingEmissions = require('./seed-data/domainHostingEmissions.js')
const pages = require('./seed-data/pages.js')
const pageViewEmissions = require('./seed-data/pageViewEmissions.js')
const pageViews = require('./seed-data/pageViews.js')
const domainUsers = require('./seed-data/domainUsers.js')

const prisma = new PrismaClient()

/**
 * Reference: https://www.prisma.io/docs/guides/database/seed-database
 */
const seedDatabase = async () => {
    for (let user of await users) {
        await prisma.user.create({ data: user })
    }
    for (let domain of domains) {
        await prisma.domain.create({ data: domain })
    }
    for (let domainUser of await domainUsers) {
        await prisma.domainUser.create({ data: domainUser })
    }
    for (let domainHostingEmission of domainHostingEmissions) {
        await prisma.domainHostingEmission.create({
            data: domainHostingEmission,
        })
    }
    for (let page of pages) {
        await prisma.page.create({ data: page })
    }
    for (let pageViewEmission of pageViewEmissions) {
        await prisma.pageViewEmission.create({
            data: pageViewEmission,
        })
    }
    for (let pageView of pageViews) {
        await prisma.pageView.create({ data: pageView })
    }
}

seedDatabase()
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })