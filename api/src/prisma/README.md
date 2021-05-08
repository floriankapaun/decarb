# [Prisma](https://www.prisma.io)

## Schema

You can find the Prisma Schema in `./schema.prisma`.

Create Migrations with `yarn migrate "YOUR_MIGRATIONS_NAME"`

## Seed Data

With help of [Faker.js](https://github.com/marak/Faker.js/), Prisma Client and Prisma's integrated seeding functionality you can populate your database with sample data. Configure the data in `./seed-data/config.js` and populate the database with `yarn seed`.

Reference: [Seeding your Database](https://www.prisma.io/docs/guides/database/seed-database)