require('dotenv').config()

export default {
  mode: 'universal',
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'PlusArchive is music archive website for everyday' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600' },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon.png' }
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
    '~/plugins/scroll',
    '~/plugins/url'
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/router',
    '@nuxtjs/google-analytics'
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  build: {
    // analyze: true,
    terser: {
      extractComments: {
        filename: 'licenses.txt'
      }
    }
  },
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
  }
}
