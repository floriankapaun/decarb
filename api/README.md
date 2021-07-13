# decarb API

## About

This is a Node.js 16.3.0 API using Express.js.

## Setup

```bash
# Install dependencies
$ yarn install

# Launch API in dev mode
$ yarn dev

# Alternative: Launch API in production mode
$ yarn build
```

## Architecture

```
src
│   index.js     # API entrypoint
│   app.js       # App instance entrypoint
│   bree.js      # Job scheduler (like cronjobs)
└───config       # 
└───jobs         # Job definitions for bree.js
└───middlewares  # 
└───prisma       # Prisma Schema (db model), migrations and faker-data
└───routes       # Express route controllers for all API endpoints
└───services     # All the business logic
└───subscribers  # Event handlers for async tasks
└───utils        # Helpfull stuff thats used troughout the project
│
public           # Statis assets that could be publicly available
└───img          #
│
.env.example     # Contains a minimal .env setup
```

The Project Architecture was heavily inspired by [this blog article](https://softwareontheroad.com/ideal-nodejs-project-structure/?utm_source=github&utm_medium=readme). I'm running Node in Cluster-Mode because some [blog](https://medium.com/tech-tajawal/clustering-in-nodejs-utilizing-multiple-processor-cores-75d78aeb0f4f) [articles](https://blog.appsignal.com/2021/02/03/improving-node-application-performance-with-clustering.html) state that this could help improve performance (at least under some circumstances). Hence the [`app.js`](./src/app.js) besides the [`index.js`](./src/index.js).

The way this System works is rather simple. The [Route-Controllers](./src/routes/) take requests and call [Services](./src/services). All the business-logic is handled inside those Services. They can do database related stuff, send mails, fetch data and create Events. Events are then registered by [Subscribers](./src/subscribers) which then call appropriate Services to asynchronously handle stuff again.

Some things like reporting the current Emission Amount of a Domain have to be repeated in a scheduled manner. I'm using Bree.js to run those [Jobs](./src/jobs).

The [Config](./src/config) loads env variables and combines them with a lot of static configuration variables that don't depend on the environment.

[Middlewares](./src/middlewares) are mainly used for authentication but for error handling as well.

To get some further insights into the Prisma things like database schema, fake-data or migrations, checkout the dedicated [README.md](./src/prisma/README.md).