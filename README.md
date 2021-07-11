# decarb – decarbonized websites

Track and offset your websites carbon footprint effortless.

## About

This project is split into a seperate [API](./api/) and [Client](./client/). Only the [Database](./db/) is running inside a Docker Container for convenience and can easily be swaped out against any other PostgreSQL setup. I'm using yarn as my package manager but you should be good to run with npm as well.

## Setup local dev environment

1. Setup `.env` Vars

Create `./api/.env` and `./client/.env` and add Variables.

> For a minimum Configuration see [`./api/.env.example`](./api/.env.example) and [`./client/.env.example`](./client/.env.example).

2. Start Docker Container for PostgreSQL and Adminer

```bash
$ cd db

# Install docker containers
$ docker-compose pull

# Start docker containers (in background)
$ docker-compose up -d
```

> For further Database related information like creating Migrations or Fake-Data see [`./api/src/prisma/README.md`](./api/src/prisma/README.md)

3. Start Client

```bash
$ cd client

# Install dependencies
$ yarn install

# Serve with hot reload at localhost:3000 (default)
$ yarn dev
```

> For further Client related information like creating a production build see [`./client/README.md`](./client/README.md)

4. Start API

```bash
$ cd api

# Install dependencies
$ yarn install

# Generate Prisma Client (only on first start)
$ yarn generate

# Apply Prisma Migrations to Database (only on first start)
$ yarn migrate_prod

# 7. Serve API in development mode with hot reload, 
# at localhost:4000 (default)
$ yarn dev
```

> For further API related information like starting in production mode see [`./api/README.md`](./api/README.md)

5. Stripe CLI

To test Stripe Webhooks in your local setup, you have to [Install the Stripe CLI](https://stripe.com/docs/stripe-cli#install) and login with your Stripe account.

```bash
# Listen to webhook triggers and forward them to the API
$ stripe listen --forward-to localhost:4000/api/v1/stripe/webhooks
```

## Staging

Everytime you push a commit to branch `origin/stage` the new Version gets deployed to [stage.decarb.website](https://stage.decarb.wesbite).

> For further information on how the Stage works and is setup, see [`./stage-server-setup.md`](./stage-server-setup.md)