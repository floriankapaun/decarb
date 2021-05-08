const faker = require('faker')

const config = require('./config.js')
const pages = require('./pages.js')

const pageViewEmissions = []

for (let page of pages) {
    const fakePageViewEmissions = {
        id: faker.datatype.uuid(),
        pageId: page.id,
        fileSize: faker.datatype.number({
            min: config.minFileSize,
            max: config.maxFileSize,
        }),
        internalRequests: faker.datatype.number({
            min: config.minInternalRequests,
            max: config.maxInternalRequests,
        }),
        externalRequests: faker.datatype.number({
            min: config.minExternalRequests,
            max: config.maxExternalRequests,
        }),
        emissionMilligrams: faker.datatype.number({
            min: config.minEmissionMilligrams,
            max: config.maxEmissionMilligrams,
        }),
    }
    pageViewEmissions.push(fakePageViewEmissions)
}

module.exports = pageViewEmissions