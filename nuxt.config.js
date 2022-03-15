import { sortRoutes } from '@nuxt/utils'
import purgecssConfig from './purgecss.config'
import {
  APP_NAME,
  APP_URL,
  APP_DESCRIPTION,
  APP_COLOR_PRIMARY
} from './src/constants/app'

export default {
  components: true,
  srcDir: 'src/',
  ssr: true,
  publicRuntimeConfig: {
    googleAnalyticsTrackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID
  },
  head: {
    titleTemplate: `%s · ${APP_NAME}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
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
        component: resolve(__dirname, 'src/pages/tracks/index')
      })

      routes.push({
        name: 'labels-search',
        path: '/labels/search',
        component: resolve(__dirname, 'src/pages/labels/index')
      })

      routes.push({
        name: 'stores-search',
        path: '/stores/search',
        component: resolve(__dirname, 'src/pages/stores/index')
      })

      routes.push({
        name: 'bookmarks-search',
        path: '/bookmarks/search',
        component: resolve(__dirname, 'src/pages/bookmarks/index')
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
    './plugins/app.client',
    './plugins/fontawesome',
    './plugins/gtag'
  ],
  buildModules: [
    '@nuxt/postcss8'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  build: {
    // analyze: true,
    postcss: {
      plugins: {
        '@fullhuman/postcss-purgecss': purgecssConfig
      }
    },
    terser: {
      extractComments: {
        filename: 'licenses.txt'
      }
    }
  }
  // top level options for packages
}
