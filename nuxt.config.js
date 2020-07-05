import { APP_NAME, APP_URL, APP_DESCRIPTION, APP_COLOR_PRIMARY } from './plugins/constants'

export default {
  ssr: true,
  components: true,
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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600&display=swap' },
      { rel: 'icon', href: '/favicon.ico' }
    ]
  },
  loading: {
    color: `#${APP_COLOR_PRIMARY}`,
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
    '@nuxtjs/google-analytics',
    '@nuxtjs/style-resources'
  ],
  modules: [
    'bootstrap-vue/nuxt',
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
    description: APP_DESCRIPTION,
    lang: 'en',
    background_color: '#222',
    display: 'standalone',
    start_url: '/'
  },
  styleResources: {
    scss: [
      './assets/css/_variables.scss',
      './node_modules/bootstrap/scss/mixins/_breakpoints.scss'
    ]
  }
}
