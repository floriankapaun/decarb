import * as publicConfig from './config/public'
import * as privateConfig from './config/private'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: `${publicConfig.PROJECT_NAME} | Decarbonized Websites`,
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
        host: privateConfig.INTERFACE,
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
    // TODO: Implement Postcss Import or change css @import statements to @use
    // See: https://github.com/postcss/postcss/issues/1247

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://github.com/Developmint/nuxt-purgecss
        // TODO: Find working configuration, its currently destroying styles
        // 'nuxt-purgecss',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://www.npmjs.com/package/@nuxtjs/style-resources
        '@nuxtjs/style-resources',
        // https://i18n.nuxtjs.org
        'nuxt-i18n',
    ],

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en',
        },
    },

    // Global accessible Style Ressources – enabled by module @nuxtjs/style-resources
    styleResources: {
        scss: [ '~/assets/scss/global.scss' ],
    },

    // Multi-Language Settings
    i18n: {
        defaultLocale: 'en',
        langDir: 'lang/',
        lazy: true,
        locales: [
            {
                code: 'en',
                file: 'en.js',
                iso: 'en-US',
            },
        ],
        parsePages: true,
        seo: false, // Recommended to do on layout-level: https://i18n.nuxtjs.org/seo/#improving-performance
        strategy: 'prefix_and_default',
        vueI18n: {
            dateTimeFormats: {
                en: {
                    short: {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    },
                },
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extractCSS: true,
    },
}
