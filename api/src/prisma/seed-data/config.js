module.exports = {
    numberOfUsers: 3,
    defaultUserPassword: 'test123123',
    chanceOfDomainUserCreation: 0.2, // = 20 % chance to create a domainUser Relation
    roles: ['OWNER', 'MANAGER'],
    numberOfDomains: 3,
    maxPagesPerDomain: 50,
    maxSlugDepth: 3,
    minByte: 10000, // bytes
    maxByte: 10000000, // bytes
    minInternalRequests: 0,
    maxInternalRequests: 40,
    minExternalRequests: 0,
    maxExternalRequests: 120,
    maxNumberOfPageViews: 1000,
    minDatetime: '2021-05-01',
    maxDatetime: '2021-07-26',
    devices: [
        { width: 320, height: 480 },
        { width: 360, height: 640 },
        { width: 375, height: 812 },
        { width: 411, height: 731 },
        { width: 768, height: 1024 },
        { width: 1024, height: 768 },
        { width: 1440, height: 900 },
        { width: 1920, height: 1080 },
        { width: 2560, height: 1440 },
    ],
    connectionTypes: ['slow-2g', '2g', '3g', '4g'],
}