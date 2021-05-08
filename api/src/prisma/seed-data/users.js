const argon2 = require('argon2')
const faker = require('faker')

const config = require('./config.js')

const users = async () => {
    const usersArray = []

    for (let i = 0; i < config.numberOfUsers; i++) {
        const fakeUser = {
            id: faker.datatype.uuid(),
            email: faker.internet.email(),
            password: await argon2.hash(config.defaultUserPassword),
            telephone: faker.phone.phoneNumber(),
            verificationCode: faker.datatype.number({ min: 100000, max: 999999 }),
            createdAt: new Date(),
            verifiedAt: new Date(),
        }
        usersArray.push(fakeUser)
    }
    
    return usersArray
}



module.exports = users()