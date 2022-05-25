export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */

  head: {
    title: "Buy stickers with Strapi, Nuxt.js and Snipcart",
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: "e-commerce starter using Strapi, Nuxt.js and Snipcart"
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
    script: []
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
      '@nuxtjs/strapi',
      'nuxt-session',
      '@nuxtjs/axios',
      '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/payment/': { target: 'https://secure.networkmerchants.com/api/transact.php', pathRewrite: {'^/payment/': ''}, changeOrigin: true },
  },
  strapi: {
    url: process.env.API_URL || "http://localhost:1337",
    entities: [
      'products',
      'categories',
      'sizes',
      'purchase-types',
      'subscription-types'
    ]
  },
  env: {
    storeUrl: process.env.STORE_URL || "http://localhost:1337"
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
}
