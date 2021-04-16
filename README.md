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
cd api

# install dependencies
$ yarn install

# serve with hot reload at localhost:4000
$ yarn dev

# build for production and launch server
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
$ yarn prisma migrate dev --name "MIGRATION_NAME"
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