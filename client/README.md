# decarb Client

This is a Nuxt.js Client using SSR mode.

## Setup

```bash
# Install dependencies
$ yarn install

# Run in development mode
$ yarn dev

# Build for production and launch production server
$ yarn build
$ yarn start
```

## Architecture

```
client
│   nuxt.config.js   # Nuxt.js Configuration
│   .env.example     # Contains a minimal .env setup
└───assets           # Images and SCSS
└───components       # Vue Components
└───config           # Publicly available and private config
└───lang             # Language definitions (hard coded text-strings)
└───layouts          # Layouts the pages get displayed in
└───middleware       #
└───pages            # The clients public pages
└───plugins          # Nuxt.js plugins
└───static           # Static assets like favicons and logo
└───store            # Vuex Store
└───utils            # Helper Functions
```

I'm using [Components](https://vue.carbondesignsystem.com/?path=/story/welcome--default) from [IBMs Carbon Design System](https://www.carbondesignsystem.com/), altough they aren't really well put together in some cases see [this PR I made](https://github.com/carbon-design-system/carbon-components-vue/pull/1179) or [that Comment](https://github.com/carbon-design-system/carbon-components-vue/issues/1059). Another thing I noticed too late into the process is the non-tree-shaking setup of the library see [my Issue on GitHub](https://github.com/carbon-design-system/carbon-components-vue/issues/1192). Their [post about the upcoming v11 Release](https://medium.com/carbondesign/carbons-2021-release-april-update-9d23242b3dea) reads like they noticed that by themselves and are trying to improve on it. 

For detailed explanation on how Nuxt things work, check out [Nuxt.js docs](https://nuxtjs.org).

### Static

The [./static](./static/) directory contains static files. Each file inside this directory is mapped to `/`. Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the Nuxt documentation](https://nuxtjs.org/guide/assets#static).

## Dev quirk

When the clients development process is started you'll get an Error:

    TypeError: options must be an array
    > plugins/carbonComponents.js:4:

If you look into [`./plugins/carbonComponents.js`](./plugins/carbonComponents.js) you'll notice, that the options (specified as the second parameter of `Vue.use()`) actually are defined as an Array.

As a workaround you have to completely remove the Array and its options to `Vue.use(CarbonComponentsVue)`, let the build finish, access [localhost:3000](http://localhost:3000) in your browser once and then you can re-add the array and it works just fine. There aren't any problems in this regard in production.
