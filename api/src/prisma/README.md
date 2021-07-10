# [Prisma](https://www.prisma.io)

## Schema

You can find the Prisma Schema in `./schema.prisma`.

Create Migrations with `yarn migrate "YOUR_MIGRATIONS_NAME"`

## Seed Data

With help of [Faker.js](https://github.com/marak/Faker.js/), Prisma Client and Prisma's integrated seeding functionality you can populate your database with sample data.

Configure the created data in `./seed-data/config.js`.

Populate the database with `yarn seed`.

Reference: [Seeding your Database](https://www.prisma.io/docs/guides/database/seed-database)

### Why Package.json?!

Since I'm using Node 16.3.0 as my Engine for the API and declared `"type": "modules"` in the [package.json](../../package.json), Prisma Seed is having trouble seeding because they use the following line in their codebase:

    const __seed = require('./src/prisma/seed.js')

That line is obviously causing an error like that:

    Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: ./decarb/api/src/prisma/seed.js
    require() of ES modules is not supported.
    require() of ./decarb/api/src/prisma/seed.js from ./decarb/api/[eval] is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.

To prevent the enforced module type, I had to create a package.json file that explicitly defines `"type": "commonjs"` in the prisma directory.