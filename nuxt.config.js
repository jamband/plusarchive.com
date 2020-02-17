import { APP_NAME } from './utils/constants'
require('dotenv').config()

export default {
  mode: 'universal',
  head: {
    titleTemplate: `%s - ${APP_NAME}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: `${APP_NAME} is music archive website for everyday` }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600&display=swap' },
      { rel: 'icon', href: '/favicon.ico' }
    ]
  },
  loading: {
    color: '#cc6055',
    height: '3px'
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/app.scss'
  ],
  plugins: [
    '~/plugins/app',
    '~/plugins/fontawesome',
    '~/plugins/init',
    '~/plugins/lazysizes.client.js',
    '~/plugins/scroll'
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/router',
    '@nuxtjs/google-analytics'
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
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
  bootstrapVue: {
    componentPlugins: [
      'NavbarPlugin'
    ],
    components: [
      'BNav', 'BNavItem', 'BNavItemDropdown',
      'BNavbar', 'BNavbarBrand', 'BNavbarNav', 'BNavbarToggle',
      'BDropdown', 'BDropdownDivider', 'BDropdownItem',
      'BCollapse'
    ],
    directivePlugins: false,
    directives: false,
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
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
    description: `${APP_NAME} is music archive website for everyday`,
    lang: 'en',
    background_color: '#222',
    display: 'standalone',
    start_url: '/'
  }
}
