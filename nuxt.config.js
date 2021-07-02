import { sortRoutes } from '@nuxt/utils'
import {
  APP_NAME,
  APP_URL,
  APP_DESCRIPTION,
  APP_COLOR_PRIMARY
} from './constants/app'

export default {
  ssr: true,
  components: [
    { path: '~/components', pathPrefix: false }
  ],
  head: {
    titleTemplate: `%s · ${APP_NAME}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: APP_DESCRIPTION },

      { hid: 'og:site_name', property: 'og:site_name', content: APP_NAME },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: APP_URL }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    extendRoutes (routes, resolve) {
      // search
      routes.push({
        name: 'tracks-search',
        path: '/tracks/search',
        component: resolve(__dirname, 'pages/tracks/index')
      })

      routes.push({
        name: 'labels-search',
        path: '/labels/search',
        component: resolve(__dirname, 'pages/labels/index')
      })

      routes.push({
        name: 'stores-search',
        path: '/stores/search',
        component: resolve(__dirname, 'pages/stores/index')
      })

      routes.push({
        name: 'bookmarks-search',
        path: '/bookmarks/search',
        component: resolve(__dirname, 'pages/bookmarks/index')
      })

      // redirects
      routes.push({
        path: '/track/:id',
        redirect: '/tracks/:id'
      })

      routes.push({
        path: '/playlist/:id',
        redirect: '/playlists/:id'
      })

      sortRoutes(routes)
    }
  },
  loading: {
    color: `#${APP_COLOR_PRIMARY}`,
    throttle: 0
  },
  css: [
    './assets/css/app.scss'
  ],
  plugins: [
    './plugins/fontawesome',
    './plugins/app.client'
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
    '@nuxtjs/google-fonts',
    '@nuxtjs/stylelint-module',
    'nuxt-purgecss'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  build: {
    // analyze: true,
    terser: {
      extractComments: {
        filename: 'licenses.txt'
      }
    }
  },
  // top level options for packages
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
    disabled: true,
    set: [
      { field: 'anonymizeIp', value: true }
    ]
  },
  googleFonts: {
    families: {
      'Source+Sans+Pro': [400, 600]
    },
    display: 'swap',
    download: true,
    stylePath: 'fonts/fonts.css'
  },
  manifest: {
    name: APP_NAME,
    short_name: APP_NAME,
    description: APP_DESCRIPTION,
    lang: 'en',
    background_color: '#222',
    display: 'standalone',
    start_url: '/'
  },
  purgeCSS: {
    paths: [
      './node_modules/@fortawesome/fontawesome-svg-core/index.js',
      './node_modules/bootstrap/js/dist/collapse.js',
      './node_modules/bootstrap/js/dist/dropdown.js',
      './node_modules/lazysizes/lazysizes.js'
    ],
    extractors: () => []
  }
}
