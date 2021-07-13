const faker = require('faker')

const config = require('./config.js')
const pages = require('./pages.js')

const pageViewEmissions = []

for (let page of pages) {
    const fakePageViewEmissions = {
        id: faker.datatype.uuid(),
        pageId: page.id,
        byte: faker.datatype.number({
            min: config.minByte,
            max: config.maxByte,
        }),
    }
    pageViewEmissions.push(fakePageViewEmissions)
}

module.exports = pageViewEmissions