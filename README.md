# Eco-Web

My bachelors thesis project

## Setup

### Client

```bash
cd client

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

### API

```bash
# 1. Switch to directory
$ cd api

# 2. Create .env
$ touch .env

# 3. Fill .env with variables like in '.env.example'

# 4. Install dependencies
$ yarn install

# 5. Generate Prisma Client
$ yarn generate

# 6. Apply Prisma Migrations to Database
$ yarn migrate_prod

# 7. Serve API in development mode
# (with hot reload, at localhost:4000)
$ yarn dev

# 7.Alt: Launch API in production mode
$ yarn build
```

### Database

```bash
cd db

# Start docker containers (in background)
$ docker-compose up -d
```

## Create a Database Migration with Prisma

```bash
$ cd api
$ yarn migrate "MIGRATION_NAME"
```

## Test Stripe Webhooks in local setup

```bash
$ stripe listen --forward-to localhost:4000/api/v1/stripe/webhooks
```

## About

### API

#### The folder structure

```
src
│   main.js      # API entry point
└───config       # Environment variables and configuration related stuff
└───jobs         # Job definitions for agenda.js (node version of cronjobs)
└───middlewares  # Middlewares
└───prisma       # Prisma Schema aka database models and migrations
└───routes       # Express route controllers for all the APIs endpoints
└───services     # All the business logic
└───subscribers  # Event handlers for async tasks
```

Inspired by [this blog article](https://softwareontheroad.com/ideal-nodejs-project-structure/?utm_source=github&utm_medium=readme)