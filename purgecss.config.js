module.exports =
  process.env.NODE_ENV === 'production'
    ? {
        content: [
          './node_modules/@fortawesome/fontawesome-svg-core/index.js',
          './node_modules/bootstrap/js/dist/collapse.js',
          './node_modules/bootstrap/js/dist/dropdown.js',
          './src/**/*.vue'
        ],
        defaultExtractor (content) {
          const _content = content.replace(/<style[^]+?<\/style>/gi, '')
          return _content.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
        },
        safelist: [
          '__layout',
          '__nuxt',
          'body',
          'html',
          'nuxt-progress',
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^nuxt-link(|-exact)-active$/,
          /data-v-.*/
        ]
      }
    : false
