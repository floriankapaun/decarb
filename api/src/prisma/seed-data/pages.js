const faker = require('faker');

const config = require('./config')
const domains = require('./domains')

const pages = []

for (let domain of domains) {
    const pagesPerDomain = faker.datatype.number({
        min: 1,
        max: config.maxPagesPerDomain,
    })
    for (let i = 0; i < pagesPerDomain; i++) {
        const slugDepth = faker.datatype.number({
            min: 1,
            max: config.maxSlugDepth,
        })
        let slug = ''
        for (let j = 0; j < slugDepth; j++) {
            slug += `/${faker.lorem.slug()}`
        }
        const fakePage = {
            id: faker.datatype.uuid(),
            url: `${domain.url}${slug}`,
            domainId: domain.id,
        }
        pages.push(fakePage)
    }
}

module.exports = pages