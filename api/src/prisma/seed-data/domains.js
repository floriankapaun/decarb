const faker = require('faker')

const config = require('./config.js')

const domains = []

for (let i = 0; i < config.numberOfDomains; i++) {
    const fakeDomain = {
        id: faker.datatype.uuid(),
        url: faker.internet.domainName(),
        companyName: faker.company.companyName(),
        estimatedMonthlyPageViews: faker.datatype.number(),
        createdAt: new Date(config.minDatetime),
        verifiedAt: new Date(config.minDatetime),
    }
    domains.push(fakeDomain)
}

module.exports = domains