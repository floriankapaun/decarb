import * as publicConfig from './config/public'
import * as privateConfig from './config/private'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'eco-web-client',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Server configuration
    server: {
        host: '0.0.0.0',
        port: privateConfig.PORT,
    },

    // Holds all env variables that are public as these will be exposed on the frontend
    publicRuntimeConfig: { ...publicConfig },

    // Holds all env variables that are private and that shouldn't be exposed on the frontend
    privateRuntimeConfig: { ...privateConfig },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~/plugins/persistedState.js', '~/plugins/carbonComponents.js'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://github.com/Developmint/nuxt-purgecss
        'nuxt-purgecss',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://www.npmjs.com/package/@nuxtjs/style-resources
        '@nuxtjs/style-resources',
    ],

    // Global accessible Style Ressources – enabled by module @nuxtjs/style-resources
    styleResources: {
        // Make Carbon Design Variables accessible in every Vue Component
        scss: [
            './node_modules/carbon-components/scss/globals/scss/_vars.scss',
            './node_modules/carbon-components/scss/globals/scss/_typography.scss',
        ],
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en',
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extractCSS: true,
    },
}
