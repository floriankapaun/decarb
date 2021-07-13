module.exports = {
    numberOfUsers: 3,
    numberOfDomains: 3,
    maxPagesPerDomain: 50,
    maxNumberOfPageViews: 1000,
    
    defaultUserPassword: 'test123123',
    chanceOfDomainUserCreation: 0.2, // = 20 % chance to create a domainUser Relation
    roles: ['OWNER', 'MANAGER'],
    maxSlugDepth: 3,
    minByte: 100000,
    maxByte: 10000000,
    minWh: 0.05,
    maxWh: 10,
    minDatetime: '2021-05-01',
    maxDatetime: '2021-07-26',
    devices: [
        { width: null, height: null },
        { width: null, height: 768 },
        { width: 768, height: null },
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
    connectionTypes: [null, 'slow-2g', '2g', '3g', '4g'],
}