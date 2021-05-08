const faker = require('faker')

const config = require('./config.js')
const domains = require('./domains.js')
const users = require('./users.js')

const domainUsers = async () => {
    const domainUsersArray = []

    for (let domain of domains) {
        for (let user of await users) {
            if (Math.random() < config.chanceOfDomainUserCreation) {
                const fakeDomainUser = {
                    role: faker.random.arrayElement(config.roles),
                    domainId: domain.id,
                    userId: user.id,
                }
                domainUsersArray.push(fakeDomainUser)
            }
        }
    }

    return domainUsersArray
}

module.exports = domainUsers()