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
    titleTemplate: `%s - ${APP_NAME}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: APP_DESCRIPTION },

      { hid: 'og:site_name', property: 'og:site_name', content: APP_NAME },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: APP_URL }
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: {
    color: `#${APP_COLOR_PRIMARY}`,
    height: '3px'
  },
  css: [
    '~/assets/css/app.scss'
  ],
  plugins: [
    '~/plugins/fontawesome',
    '~/plugins/init.client.js'
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
    '@nuxtjs/router',
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
      './node_modules/bootstrap/js/dist/dropdown.js'
    ],
    extractors: () => []
  }
}
