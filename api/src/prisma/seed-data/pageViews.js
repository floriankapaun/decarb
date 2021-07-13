const faker = require('faker')

const config = require('./config.js')
const pages = require('./pages')
const pageViewEmissions = require('./pageViewEmissions.js')

const pageViews = []

for (let page of pages) {
    const pageViewEmission = pageViewEmissions.find((x) => x.pageId === page.id)
    const numberOfPageViews = faker.datatype.number(config.maxNumberOfPageViews)
    for (let i = 0; i < numberOfPageViews; i++) {
        const device = faker.random.arrayElement(config.devices)
        const fakePageView = {
            id: faker.datatype.uuid(),
            pageId: page.id,
            pageViewEmissionId: pageViewEmission.id,
            windowWidth: device.width,
            windowHeight: device.height,
            connectionType: faker.random.arrayElement(config.connectionTypes),
            uncachedVisit: faker.datatype.boolean(),
            byte: faker.datatype.number({
                min: config.minByte,
                max: config.maxByte,
            }),
            wh: faker.datatype.number({
                min: config.minWh,
                max: config.maxWh,
            }),
            createdAt: faker.date.between(config.minDatetime, config.maxDatetime),
        }
        pageViews.push(fakePageView)
    }
}

module.exports = pageViews