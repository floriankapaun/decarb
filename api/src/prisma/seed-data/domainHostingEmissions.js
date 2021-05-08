const faker = require('faker')

const domains = require('./domains.js')

const domainHostingEmissions = []

for (let domain of domains) {
    const fakeDomainHostingEmission = {
        id: faker.datatype.uuid(),
        domainId: domain.id,
        renewableEnergy: faker.datatype.boolean(),
    }
    domainHostingEmissions.push(fakeDomainHostingEmission)
}

module.exports = domainHostingEmissions